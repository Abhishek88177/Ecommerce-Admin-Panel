// src/components/LatestOrders.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderDesc from '../OrderPage/OrderDesc';
import './../../assets/css/LatestOrders.css';
import axiosInstance from '../../context/AxiosConfig';

// const orders = [
//   { orderId: "ORD-007", customer: "Ekaterina Tankova", date: "Mar 8, 2024" },
//   { orderId: "ORD-006", customer: "Cao Yu", date: "Mar 8, 2024" },
//   { orderId: "ORD-004", customer: "Alexa Richardson", date: "Mar 8, 2024" },
//   { orderId: "ORD-003", customer: "Anje Keizer", date: "Mar 8, 2024" },
//   { orderId: "ORD-002", customer: "Clarke Gillebert", date: "Mar 8, 2024" },
//   { orderId: "ORD-001", customer: "Adam Denisov", date: "Mar 8, 2024" },
//   { orderId: "ORD-003", customer: "Anje Keizer", date: "Mar 8, 2024" },
//   { orderId: "ORD-002", customer: "Clarke Gillebert", date: "Mar 8, 2024" },
//   { orderId: "ORD-001", customer: "Adam Denisov", date: "Mar 8, 2024" }
// ];



const LatestOrders = () => {

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalOrder , setModalOrder] = useState({})

  const pageSize = 8;

  useEffect(()=>{
    allOrders(currentPage)
  }, [currentPage])

  const allOrders = async (currentPage) => {
    try {
      const response = await axiosInstance.get(`/order/paged?page=${currentPage}&size=${pageSize}`);
      console.log(response.data.content);
      setOrders(response.data.content)
    } catch (error) {

    }
  }

  const handleModal = (order) =>{
    setShowModal(true)
    setModalOrder(order)
  }

  return (
    <div className="card latest-orders shadow-sm">
      <div className="card-header">
        Latest orders
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Customer</th>
              <th scope="col" className='col-md-5 text-center'>Date</th>
              <th className='text-center'>show</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td className='text-center'>{order.orderDate}</td>
                <td className='text-center'><a onClick={() => handleModal(order)}>More <i className='fa fa-arrow-right'></i></a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-center">
        <Link to="/order">
        View all &rarr;
        </Link>
      </div>

{
  showModal ? 
  <OrderDesc
  show={showModal}
  handleClose={() => setShowModal(false)}
  data = {modalOrder}
  /> : 
  <></>
}
     

    </div>
  );
};

export default LatestOrders;
