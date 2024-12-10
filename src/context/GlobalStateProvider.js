import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [customerCount, setCustomerCount] = useState(1);
  const [vendorCount, setVendorCount] = useState(1);

  return (
    <GlobalStateContext.Provider
      value={{
        customerCount,
        setCustomerCount,
        vendorCount,
        setVendorCount,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
