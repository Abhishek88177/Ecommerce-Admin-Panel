import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../assets/css/UserTable.css';
import swal from 'sweetalert';
import UpdateProduct from './UpdateProduct';
import Switch from 'react-switch';
import axiosInstance from '../../context/AxiosConfig';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const pageSize = 5; // Number of products per page

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage,products]); 

  const getAllProducts = async (page) => {
    try {
      const response = await axiosInstance.get(`/product/getAllProduct?page=${page}&size=${pageSize}`);
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
      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const lenght = products.length;

  const deleteProduct = async (id) => {
    try {
      const deleteResponse = await axiosInstance.delete(`/product/deleteproduct/${id}`);
      console.log(deleteResponse.data);
      getAllProducts(currentPage); // Refresh products after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSearchButton = (event) => {
    const targetValue = event.target.value;
    setSearchValue(targetValue);
    const result = products.filter((item) => item.name.toLowerCase().includes(targetValue.toLowerCase()))
    if(targetValue===""){
      getAllProducts(currentPage);
  }else{
      setProducts(result)
  }

  // if(targerValue===""){
  //       getAllProducts();
  //   }else{
  //     try{
  //       const response = await axiosInstance.get(`http://localhost:8084/product/getProductByName/${targerValue}` , {
  //         timeout: 5000 
  //       });
  //       setProducts(response.data)
  //     } catch(error){
  //       console.error('Error fetching products:', error);
  //     }
  //   }

  };


  // Handle toggle change
  const handleToggleChange = async(productId) => {

      try{
        const response =await axiosInstance.put(`/product/updateStatus/${productId}`);
        console.log(response)
      } catch(error){
        console.error('Error Updating product Status:', error);
      }    
  };
  

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      

      <div className="table-responsive mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
            <th scope="col">Visible</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Desc</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col"><i className='fa fa-edit'></i></th>
              <th scope="col"><i className='fa fa-trash'></i></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>

<td>
<div className="input-group my-3">
      <Switch 
        onChange={()=>handleToggleChange(product.productId)} 
        checked={product.status}
        offColor="#888"
        onColor="#0b0"
      />
    </div>
          </td>
          
                <td className="custom-checkbox">
                  <img src={product.image} className="me-2" width="60" height="60" alt="Product" />
                </td>
                <td>{product.name}</td>
                <td className='col-4'>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  
                  <a className='edit-icon' onClick={() => handleEditClick(product)}>
                      <i className='fa fa-edit'></i>
                    </a>
                    
                    </td>
                <td>
                                
                    <a className='delete-icon' onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this product!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          deleteProduct(product.productId);
                          swal("Poof! Your product has been deleted!", {
                            icon: "success",
                          });
                        } else {
                          swal("Your product is safe!");
                        }
                      });
                    }}>
                      <i className='fa fa-trash'></i>
                    </a>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center">
          <span>Rows per page: {pageSize}</span>
          <span>{`Showing ${(currentPage * pageSize) + 1} - ${(currentPage * pageSize) + products.length} of ${lenght}`}</span>
          <div>
            <button className="btn btn-link" onClick={prevPage} disabled={currentPage === 0}>
              <i className="fa fa-chevron-left mx-2" aria-hidden="true"></i>
            </button>
            <button className="btn btn-link" onClick={nextPage} disabled={products.length < pageSize}>
              <i className="fa fa-chevron-right mx-2" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <UpdateProduct
          show={showModal}
          handleClose={handleClose}
          data={selectedProduct}
        />
      )}
    </>
  );
};

export default ProductTable;