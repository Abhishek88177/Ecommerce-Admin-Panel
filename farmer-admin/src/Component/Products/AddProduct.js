import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import axiosInstance from '../../context/AxiosConfig';

const AddCategoryForm = ({ show, handleClose, handleSave }) => {


  useEffect(()=>{
    getAllCategory()
  },[])

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    image: null,
  });

  const [category , setCategory] = useState([]);

  const getAllCategory = async() =>{
    const response = await axiosInstance.get('/product/getAllCategory');
    setCategory(response.data)
    console.log(response.data)
  }

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProduct({
        ...product,
        image: e.target.files[0],
      });
    } else {
      const { name, value } = e.target;
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 5000,
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('image', product.image);


    axiosInstance.post('/product/saveProduct', formData, config).then(response => {
      console.log(response);
      setProduct("");
    })

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter image URL"
              name="image"
              // value={product.image}
              onChange={handleChange}
              required
            />

          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {
                category.map((cat,index) => (
                  <option value={cat.catName}>{cat.catName}</option>
                ))
              }
              {/* <option value="category2">Category 2</option>
              <option value="category3">Category 3</option> */}
              {/* Add more options as needed */}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryForm;
