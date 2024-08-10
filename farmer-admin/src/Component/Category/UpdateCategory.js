import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import axiosInstance from '../../context/AxiosConfig';

const UpdateCategory = ({ show, handleClose, data }) => {
  const [form, setForm] = useState({
    
    catName: '',
    catType: '',
    catImages: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setForm({
        catName: data.catName,
        catType: data.catType,
        catImages: null, // Not setting the existing image, as it will be replaced on update
      });
    }
  }, [data]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await axiosInstance.get('/product/getAllCategory');
      setCategories(response.data.content || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'catImages') {
      setForm({
        ...form,
        catImages: files[0],
      });
    } else {
      setForm({
        ...form,
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
    formData.append('catId', data.catId);
    formData.append('catName', form.catName);
    formData.append('catType', form.catType);
    if (form.catImages) {
      formData.append('catImages', form.catImages);
    }

    try {
      const response =  await axios.put(`http://localhost:8084/category/updateCategory`, formData, config)
      console.log(response.data);
      setForm({
        catName: '',
        catType: '',
        catImages: null,
      });
      handleClose();

    } catch (error) {
      console.error('There was an error updating the category:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? 'Update Category' : 'Add Category'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCatImages">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="catImages"
              onChange={handleChange}
            />
            {form.catImages && (
              <img src={URL.createObjectURL(form.catImages)} alt="Preview" width="100" />
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCatName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              name="catName"
              value={form.catName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCatType">
            <Form.Label>Category Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category type"
              name="catType"
              value={form.catType}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCategory;
