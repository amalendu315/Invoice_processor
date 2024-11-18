"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import VoucherList from "./voucherList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import ApiResponseAlert from "./apiResponseAlert";
import { _Voucher } from "@/constants";
import { Checkbox } from "./ui/checkbox";

const VoucherForm = () => {
  const [isSalesLoading, setIsSalesLoading] = useState(false);
  const [isCloudLoading, setIsCloudLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [vouchers, setVouchers] = useState<_Voucher[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [autoPushEnabled, setAutoPushEnabled] = useState(false);
  const [autoPushInterval, setAutoPushInterval] = useState(43200000); // 12 hours in milliseconds

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (autoPushEnabled) {
      intervalId = setInterval(async () => {
        const start = 1;
        const end = 10;
        try {
          const response = await fetch(`/api/sales?start=${start}&end=${end}`);
          const data = await response.json();
          const voucherNumbers = data.map(
            (voucher: { number: string }) => voucher.number
          );
          await fetch("/api/cloud", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ vouchers: voucherNumbers }),
          });
          toast.success("Vouchers pushed automatically!");
        } catch (error) {
          console.error("Error in automatic voucher push:", error);
          toast.error("Failed to push vouchers automatically.");
        }
      }, autoPushInterval);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoPushEnabled, autoPushInterval]);

  const handleFetchSalesEntries = async () => {
    try {
      setIsSalesLoading(true);
      const response = await fetch(
        `/api/sales?startDate=${dateRange.start}&endDate=${dateRange.end}`
      );

      const data = await response?.json();
      if (!response?.ok) {
        toast.error("No Data Found");
      } else {
        setVouchers(data?.data);
        toast.success("Fetched Data For Selected Range!");
      }
      // console.log('data', data?.data)

      setIsSalesLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error Fetching The Data :(");
      setIsSalesLoading(false);
    }
  };

  const handleSubmitToCloud = async () => {
    try {
      setIsCloudLoading(true);
      const vouchersPerRequest = 50;
      for (let i = 0; i < selectedEntries.length; i += vouchersPerRequest) {
        const dataForCloud = selectedEntries
          .slice(i, i + vouchersPerRequest)
          .map((index) => {
            const voucher = vouchers[index];
            return {
              branchName: "AirIQ",
              vouchertype: "Sales",
              voucherno: `${voucher.FinPrefix}/${voucher.InvoiceNo}`,
              voucherdate: voucher.SaleEntryDate.split("T")[0].replace(
                /-/g,
                "/"
              ),
              narration: voucher.Pnr,
              ledgerAllocation: [
                {
                  lineno: 1,
                  ledgerName: voucher.AccountName,
                  amount: voucher.FinalRate.toFixed(2),
                  drCr: "dr",
                },
                {
                  lineno: 2,
                  ledgerName: "Domestic Base Fare",
                  amount: voucher.FinalRate.toFixed(2),
                  drCr: "cr",
                },
              ],
            };
          });

        const response = await fetch("/api/cloud", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: dataForCloud }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Cloud server error:", response.status, errorText);
          throw new Error(
            `Cloud server responded with status ${response.status}`
          );
        } else {
          {
            i !== 0 && toast.success(`${i} Vouchers Pushed!`);
          }
        }
      }

      setApiResponse("Vouchers submitted successfully!");

      const lastVoucher = vouchers[vouchers.length - 1];
      const lastVoucherDate = lastVoucher?.InvoiceEntryDate;
      if (lastVoucherDate) {
        const formattedDate = new Date(lastVoucherDate)
          .toISOString()
          .split("T")[0];
        localStorage.setItem("lastUpdatedVoucherDate", formattedDate);
      }
      toast.success("Vouchers Submitted Successfully!");
      setIsCloudLoading(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      setApiResponse("Error submitting vouchers to the cloud.");
      setIsCloudLoading(false);
    }
  };
  return (
    <>
      <Card>
        <CardContent>
          <div className="grid gap-4 pt-4">
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <Input
                type="date"
                id="startDate"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <Input
                type="date"
                id="endDate"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </div>
            <Button onClick={handleFetchSalesEntries} disabled={isSalesLoading}>
              Fetch Sales Entries
            </Button>
            {vouchers?.length > 0 && (
              <VoucherList
                vouchers={vouchers}
                onSelect={setSelectedEntries}
                selectedEntries={selectedEntries}
              />
            )}
            <Button onClick={handleSubmitToCloud} disabled={isCloudLoading}>
              Submit to Cloud
            </Button>
            {apiResponse && (
              <div className="mt-4">
                <p>{apiResponse}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {apiResponse && (
        <ApiResponseAlert
          response={apiResponse}
          title={"Response from the cloud"}
          variant={"default"}
        />
      )}
    </>
  );
};

export default VoucherForm;
