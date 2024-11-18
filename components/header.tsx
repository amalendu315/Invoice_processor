"use client";
import React from 'react'
import VoucherContext from '@/context/VoucherContext';
import AuthContext from '@/context/AuthContext';

const Header = () => {
 const { lastUpdatedVoucherDate } = React.useContext(VoucherContext);
 const { isAuthenticated } = React.useContext(AuthContext);
  return (
    <>
      <div className=" flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900">
        <header className="text-white text-center text-3xl font-bold p-2 flex flex-col items-center justify-around w-full">
          {/* Added flex items-center */}
          <h3>Voucher Processor</h3>
          {/* Conditionally render myValue */}
          <p className="text-white text-sm font-bold pb-2">
            Enter date range and process entries
          </p>
        </header>
        {isAuthenticated && lastUpdatedVoucherDate && (
          <span className="ml-4 text-lg text-white">Last Date Pushed :- {lastUpdatedVoucherDate}</span>
        )}
      </div>
    </>
  );
}

export default Header