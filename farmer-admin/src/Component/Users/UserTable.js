// src/components/CustomersTable.js
import React, { useEffect, useState } from 'react';
import '../../assets/css/UserTable.css';
import axios from 'axios';
import swal from 'sweetalert';
import UpdateUser from './UpdateUser';
import axiosInstance from '../../context/AxiosConfig';


const UserTable = () => {
  const [customer, setCustomer] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const pageSize = 5;
  const apiKey ='f76494fabf3c4d30aec5b1f128dc6dff'
  useEffect(() => {
    getAllCustomer(currentPage);
  }, [currentPage]); 

  const getAllCustomer = async (page) => {
    try {
      const response = await axiosInstance.get(`/api/v1/user/getAllUserWithPage?page=${page}&size=${pageSize}`);
      const dataWithLocation = await Promise.all(
        response.data.content.map(async (customer)=>{

          const location = await getAddressFromCoordinates(customer.location);
          return {
            ...customer,
            location
          };

        })
      )

      setCustomer(dataWithLocation);

      console.log(customer)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getAddressFromCoordinates = async (coordinates) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${coordinates}&key=${apiKey}`);
      if (response.data.results.length > 0) {
        return response.data.results[0].formatted;
      } else {
        return 'Location not found';
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      return 'Error fetching location';
    }
  };



  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const deleteCustomer = async (id) => {
    try {
      const deleteResponse = await axiosInstance.delete(`/api/v1/user/deleteuser/${id}`);
      console.log(deleteResponse.data);
      getAllCustomer(currentPage); 
    } catch (error) {
      console.error('Error deleting Customer:', error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () =>{
    setShowModal(false);
    setSelectedUser(null);
  }


  return (

    <>
      <div className="input-group my-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
        <input type="text" className="form-control" placeholder="Search customer" aria-label="Search customer" aria-describedby="basic-addon1" />
      </div>
      
      
          <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">CustId</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col" className='text-center'>Location</th>
            <th scope="col">Phone</th>
            <th scope="col">Password</th>
            <th scope="col"><i className='fa fa-edit'></i></th>
              <th scope="col"><i className='fa fa-trash'></i></th>
          </tr>
        </thead>
        <tbody>
          {customer.map((customers, index) => (
            <tr key={index}>
              <td className="custom-checkbox">{customers.userId}</td>
              <td>
                {customers.userName}
              </td>
              <td>{customers.email}</td>
              <td>{customers.location}</td>
              <td>{customers.mobileNo}</td>
              <td>{customers.password}</td>
            
              <td>
                  
                  <a className='edit-icon' onClick={() => handleEditClick(customers)}>
                      <i className='fa fa-edit'></i>
                    </a>
                    
                    </td>
                <td>
                                
                    <a className='delete-icon' onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this customers!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          deleteCustomer(customers.userId);
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
          <span>{`Showing ${(currentPage * pageSize) + 1} - ${(currentPage * pageSize) + customer.length} of ${customer.length}`}</span>
          <div>
            <button className="btn btn-link" onClick={prevPage} disabled={currentPage === 0}>
              <i className="fa fa-chevron-left mx-2" aria-hidden="true"></i>
            </button>
            <button className="btn btn-link" onClick={nextPage} disabled={customer.length < pageSize}>
              <i className="fa fa-chevron-right mx-2" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {
          selectedUser && 
          <UpdateUser 
          show={showModal}
          handleClose={handleClose}
          data={selectedUser}
          />
        }
      </div>

      </>

    
  );
};

export default UserTable;
