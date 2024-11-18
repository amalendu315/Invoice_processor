// context/VoucherContext.jsx

"use client";
import { createContext, useState, useEffect } from "react";

const VoucherContext = createContext({
  lastUpdatedVoucherDate: "",
  setLastUpdatedVoucherDate: (date: string) => {},
});

export const VoucherProvider = ({ children }:{children:React.ReactNode}) => {
  const [lastUpdatedVoucherDate, setLastUpdatedVoucherDate] = useState("");

  useEffect(() => {
    const storedDate = localStorage.getItem("lastUpdatedVoucherDate");
    if (storedDate) {
      setLastUpdatedVoucherDate(storedDate);
    }
  }, []);

  return (
    <VoucherContext.Provider
      value={{ lastUpdatedVoucherDate, setLastUpdatedVoucherDate }}
    >
      {children}
    </VoucherContext.Provider>
  );
};

export default VoucherContext;
