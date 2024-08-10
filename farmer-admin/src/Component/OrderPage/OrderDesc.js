import React from 'react'
import { Modal, ModalHeader, ModalTitle, Table } from 'react-bootstrap'
import '../../assets/css/OrderDescModel.css';


function OrderDesc({ show, handleClose, data }) {

  console.log(data)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>

      <details className='m-3'>
        <summary><strong>Open Order Datails </strong> : {data.orderNumber}</summary>
        <table class="table table-striped mt-3">
          <tbody className='text-center'>
            <tr>
              <th>Order Number</th>
              <td>{data.orderNumber}</td>
            </tr>
            <tr>
              <th>Order Date</th>
              <td>{data.orderDate}</td>
            </tr>
            <tr>
              <th>Customer Name</th>
              <td>{data.customerName}</td>
            </tr>
            <tr>
              <th>Delivery Address</th>
              <td>{data.deliveryAddress}</td>
            </tr>
            <tr>
              <th>Payment Method</th>
              <td>{data.paymentMethod}</td>
            </tr>
            <tr>
              <th>Payment Status</th>
              <td>{data.paymentStatus}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{data.status}</td>
            </tr>
            <tr>
              <th>Total Amount</th>
              <td>{data.totalAmount}</td>
            </tr>
            <tr>
              <th>Delivery Date</th>
              <td>{data.deliveryDate}</td>
            </tr>
          </tbody>
        </table>
      </details>

      <div className='table-responsive m-2'>
        <h6 className='text-center'>Product Details</h6>

        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Total Price</th>
            </tr>

          </thead>
          {

            data.orderItems.map((item) => (
              <tr>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))
          }

        </table>
      </div>
      {/* </li>
            </ul> */}
      <Modal.Body>
        <Table>

        </Table>
      </Modal.Body>

    </Modal>
  )
}

export default OrderDesc