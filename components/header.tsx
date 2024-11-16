import React from 'react'

const Header = () => {
  return (
    <>
      <div className=" flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900">
        <header className="text-white text-center text-3xl font-bold p-2">
          Voucher Processor
        </header>
        <p className="text-white text-center text-xl font-bold pb-2">
          Enter date range and process entries
        </p>
      </div>
    </>
  );
}

export default Header