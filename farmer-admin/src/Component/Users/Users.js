// src/components/Customers.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../assets/css/Users.css';
import AddUserModal from './AddUserModal';
import UserTable from './UserTable';
import * as XLSX from 'xlsx'; 
import axiosInstance from '../../context/AxiosConfig';

const Users = () => {

  const [showModal, setShowModal] = useState(false);

  const [customerList , setCustomer] = useState([])

  useEffect(()=>{
    allUsers()
  },[])


  const allUsers = async () =>{

    try{
    const response = await axiosInstance.get(`/api/v1/user/getAllUser`);
    setCustomer(response.data);
    } catch(error){
      console.log("Error")
    }
  }

  const handleExport = () => {
    
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(customerList);

    XLSX.utils.book_append_sheet(wb, ws, 'Customer');

    XLSX.writeFile(wb, 'customer.xlsx');
  };

  return (
    <>
    <div className="customers-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Customers</h1>
         <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>+ Add</button>
      </div>
      <div className="d-flex justify-content-start align-items-center mb-3">
        {/* <button className="btn btn-outline-secondary me-2">
          <i className="fa fa-upload" aria-hidden="true"></i> Import
        </button> */}
        <button className="btn btn-outline-secondary" onClick={handleExport}>
          <i className="fa fa-download" aria-hidden="true"></i> Export
        </button>
      </div>
    

      <AddUserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        // handleSave={handleAddUser}
      />

    </div>

    <UserTable />
    </>
  );
};

export default Users;
