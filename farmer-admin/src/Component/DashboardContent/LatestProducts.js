// src/components/LatestProducts.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/LatestProducts.css';
import axiosInstance from '../../context/AxiosConfig';


const LatestProducts = () => {

  const [productList , setProductList] = useState([])

  useEffect(()=>{
    allProducts()
  },[])


  const allProducts = async () =>{
    try{
    const response = await axiosInstance.get(`/product/getAllProduct?page=${0}&size=${5}`);
    const productsWithImages = await Promise.all(
      response.data.content.map(async (product) => {
        const imageResponse = await axiosInstance.get(`/product/image/${product.productId}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(imageResponse.data);
        return {
          ...product,
          image: imageUrl,
        };
      })
    );
    setProductList(productsWithImages);
    console.log(productsWithImages)
    } catch(error){
      console.log("Error")
    }
  }
  return (
    <div className="card latest-products shadow-sm">
      <div className="card-header">
        Latest products
      </div>
      <ul className="list-group list-group-flush">
        {productList.map((product, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <img src={product.image} alt={product.name} className="img-thumbnail" />
            <div className="flex-grow-1 mx-2">
              <div>{product.name}</div>
              <small className="text-muted">{product.date}</small>
            </div>
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
          </li>
        ))}
      </ul>
      <div className="card-footer text-center">
        <Link to='/product'>
        <a href="#view-all" className="text-decoration-none">View all &rarr;</a>
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
