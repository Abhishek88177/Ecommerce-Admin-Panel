import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import OrderDesc from './OrderDesc';
import axiosInstance from '../../context/AxiosConfig';

function AllOrders() {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalOrder, setModalOrder] = useState({})

    const pageSize = 5;

    useEffect(() => {
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

    const handleModal = (order) => {
        setShowModal(true)
        setModalOrder(order)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleUpdateStatus = async (id,updatedStatus) =>{
        const response = await axiosInstance.put(`/order/updatestatus?id=${id}&status=${updatedStatus}`);
        
        if(response){
            toast.success('Order status updated successfully');
            console.log("updaet")
            allOrders(currentPage)
        }
    }

    return (
        <>
            <div className="customers-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>Order</h1>

                </div>
                <div className="d-flex justify-content-start align-items-center mb-3">
                    {/* <button className="btn btn-outline-secondary me-2">
          <i className="fa fa-upload" aria-hidden="true"></i> Import
        </button> */}
                    <button className="btn btn-outline-secondary">
                        <i className="fa fa-download" aria-hidden="true"></i> Export
                    </button>
                </div>


            </div>

            <div className="card latest-orders shadow-sm">
                <div className="card-header">
                    Latest orders
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>


                                <th scope="col" >Products</th>
                                <th scope="col" className='col-md-2'>Order Number</th>
                                <th scope="col" className='col-md-3'>Order Date</th>
                                <th scope="col">Customer</th>
                                <th scope="col" className='col-md-3'>Delivery Address</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Payment Status</th>
                                <th scope="col">Status</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col" className='col-md-3'>Delivery Date</th>
                                {/* <th scope="col">Customer</th> */}

                                {/* <p><strong>Order Number:</strong> {order.orderNumber}</p>
                    <p><strong>Order Date:</strong> {order.orderDate}</p>
                    <p><strong>Customer Name:</strong> {order.customerName}</p>
                    <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Amount:</strong> {order.totalAmount}</p>
                    <p><strong>Delivery Date:</strong> {order.deliveryDate}</p> */}
                                {/* <th scope="col" className='col-md-5 text-center'>Date</th>
              <th className='text-center'>show</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td className='text-center'><a onClick={() => handleModal(order)}>More <i className='fa fa-arrow-right'></i></a></td>
                                    <td>{order.orderNumber}</td>
                                    <td className='col-md-5'>{order.orderDate}</td>
                                    <td>{order.customerName}</td>
                                    <td >{order.deliveryAddress}</td>
                                    <td >{order.paymentMethod}</td>
                                    <td >{order.paymentStatus}</td>
                                    <td>
                                        <select id="status" name="status" value={order.status} onChange={(e) => handleUpdateStatus(order.orderId,e.target.value)}>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>

                                    <td >{order.totalAmount}</td>
                                    <td className='col-md-5'>{order.deliveryDate}</td>
                                    {/* <td className='text-center'><a onClick={}>More <i className='fa fa-arrow-right'></i></a></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Rows per page: {pageSize}</span>
                        <span>{`Showing ${(currentPage * pageSize) + 1} - ${(currentPage * pageSize) + orders.length} of ${orders.length}`}</span>
                        <div>
                            <button className="btn btn-link" onClick={prevPage} disabled={currentPage === 0}>
                                <i className="fa fa-chevron-left mx-2" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-link" onClick={nextPage} disabled={orders.length < pageSize}>
                                <i className="fa fa-chevron-right mx-2" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {
                showModal ?
                    <OrderDesc
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        data={modalOrder}
                    /> :
                    <></>
            }
        </>
    )
}

export default AllOrders