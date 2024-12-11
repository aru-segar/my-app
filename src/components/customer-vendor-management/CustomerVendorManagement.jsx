import React, { useContext } from "react";
import axios from "axios";
import { FaPlus, FaMinus, FaUserAlt, FaStore } from "react-icons/fa";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import "./CustomerVendorManagement.css";

const CustomerVendorManagement = () => {
  const {
    customerCount,
    setCustomerCount,
    vendorCount,
    setVendorCount,
  } = useContext(GlobalStateContext);

  const customerApiUrl = "http://localhost:8080/ticketing-system/api/customers";
  const vendorApiUrl = "http://localhost:8080/ticketing-system/api/vendors";

  const addCustomer = async () => {
    try {
      await axios.post(`${customerApiUrl}/add`);
      setCustomerCount(customerCount + 1);
    } catch (error) {
      console.error("Error adding customer: ", error);
    }
  };

  const removeCustomer = async () => {
    try {
      await axios.delete(`${customerApiUrl}/remove`);
      setCustomerCount(Math.max(customerCount - 1, 0));
    } catch (error) {
      console.error("Error removing customer: ", error);
    }
  };

  const addVendor = async () => {
    try {
      await axios.post(`${vendorApiUrl}/add`);
      setVendorCount(vendorCount + 1);
    } catch (error) {
      console.error("Error adding vendor: ", error);
    }
  };

  const removeVendor = async () => {
    try {
      await axios.delete(`${vendorApiUrl}/remove`);
      setVendorCount(Math.max(vendorCount - 1, 0));
    } catch (error) {
      console.error("Error removing vendor: ", error);
    }
  };

  return (
    <div className="box-container">
      <div className="box">
        <FaUserAlt className="icon icon-customer" />
        <h3>Customers</h3>
        <div className="count-box">
          <button onClick={removeCustomer} className="count-btn minus-btn">
            <FaMinus />
          </button>
          <span>{customerCount}</span>
          <button onClick={addCustomer} className="count-btn plus-btn">
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="box">
        <FaStore className="icon icon-vendor" />
        <h3>Vendors</h3>
        <div className="count-box">
          <button onClick={removeVendor} className="count-btn minus-btn">
            <FaMinus />
          </button>
          <span>{vendorCount}</span>
          <button onClick={addVendor} className="count-btn plus-btn">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerVendorManagement;
