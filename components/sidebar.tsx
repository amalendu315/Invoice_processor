// components/SideHeader.jsx

"use client";
import React, { useContext } from "react";
import VoucherContext from "@/context/VoucherContext";

const SideHeader = () => {
  const { lastUpdatedVoucherDate, submissionDate } = useContext(VoucherContext);

  return (
    <aside className="bg-gray-800 text-white p-4 w-64 h-screen fixed top-0 left-0 flex flex-col justify-center items-center gap-8">
      <h2 className="text-xl font-bold mb-4">Voucher Date Details</h2>
      <div className="flex flex-col gap-8">
        {" "}
        {/* Added gap-4 */}
        <p className="flex flex-col items-center justify-center">
          Last Updated Voucher Date:{" "}
          <span className="text-md font-bold text-green-500">
            {lastUpdatedVoucherDate || "N/A"}
          </span>
        </p>
        <p className="flex flex-col items-center justify-center">
          Submission Date:{" "}
          <span className="text-md font-bold text-green-500">
            {submissionDate || "N/A"}
          </span>
        </p>
        {/* Add any other details you want to display */}
      </div>
    </aside>
  );
};

export default SideHeader;