// src/components/Customers.js
import React, { useEffect, useState } from 'react';
import '../../assets/css/Users.css';
import AddProductModal from './AddProduct';
import AddUserModal from './AddProduct';
import ProductTable from './ProductTable';
import UserTable from './ProductTable';
import * as XLSX from 'xlsx'; 
import axios from 'axios';
import axiosInstance from '../../context/AxiosConfig';

const Products = () => {

  const [showModal, setShowModal] = useState(false);

  const [productList , setProductList] = useState([])

  useEffect(()=>{
    allProducts()
  },[])


  const allProducts = async () =>{

    try{
    const response = await axiosInstance.get(`/product/getAllProductWitoutPagination`);
    setProductList(response.data);
    } catch(error){
      console.log("Error")
    }
  }

  const handleExport = () => {
    
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(productList);

    XLSX.utils.book_append_sheet(wb, ws, 'Products');

    XLSX.writeFile(wb, 'products.xlsx');
  };

  return (
    <>
    <div className="customers-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Product</h1>
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
     

      <AddProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        // handleSave={handleAddUser}
      />

    </div>

    <ProductTable />
    </>
  );
};

export default Products;
