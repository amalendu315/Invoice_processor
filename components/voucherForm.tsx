"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import VoucherList from "./voucherList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import ApiResponseAlert from "./apiResponseAlert";

const VoucherForm = () => {
  const [voucherRange, setVoucherRange] = useState({ start: "", end: "" });
  const [vouchers, setVouchers] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const handleFetchSalesEntries = async () => {
     try {
       const response = await fetch(
         `/api/sales?start=${voucherRange.start}&end=${voucherRange.end}`
       );
       const data = await response.json();
       setVouchers(data);
       toast.success("Fetched Data For Selected Range!");
     } catch (error) {
       console.error("Error fetching data:", error);
       toast.error("Error Fetching The Data :(");
     }
  };

  const handleSubmitToCloud = async () => {
    try {
      const response = await fetch("/api/cloud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vouchers: selectedEntries }),
      });
      const data = await response.json();
      setApiResponse("Vouchers submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error Submitting Data To The Cloud!");
      // Handle error, e.g., show an error message
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Voucher Processing</CardTitle>
          <CardDescription>
            Enter voucher range and process entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              type="number"
              placeholder="Start Voucher"
              value={voucherRange.start}
              onChange={(e) =>
                setVoucherRange({ ...voucherRange, start: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="End Voucher"
              value={voucherRange.end}
              onChange={(e) =>
                setVoucherRange({ ...voucherRange, end: e.target.value })
              }
            />
            <Button onClick={() => handleFetchSalesEntries()}>
              Fetch Sales Entries
            </Button>
            {vouchers.length > 0 && (
              //@ts-ignore
              <VoucherList
                vouchers={vouchers}
                onSelect={setSelectedEntries}
                selectedEntries={selectedEntries}
              />
            )}
            <Button onClick={() => handleSubmitToCloud()}>
              Submit to Cloud
            </Button>
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
