// src/components/AddUserModal.js
import { isDisabled } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../context/AxiosConfig';

const UpdateUser = ({ show, handleClose, data }) => {


  useEffect(()=>{
    setUserData({
        userId: data.userId,
        userName: data.userName,
        email: data.email,
        location: data.location,
        mobileNo: data.mobileNo,
        password: data.password
    })
  },[])

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    mobileNo: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const config = {
    headers:{
    'Content-Type' : 'application/json'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...userData, signedUp: new Date().toLocaleDateString() };
    console.log(newUser)
    // handleSave(newUser);

    axiosInstance.put('/api/v1/user/updateUser',userData , config).then(response =>{
        console.log(response)
    })
    handleClose();
  };


  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserData((prevUserData) => ({
            ...prevUserData,
            location: `${latitude}, ${longitude}`,
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={userData.location}
              disabled
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="mobileNo"
              value={userData.mobileNo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" className='btn btn-dark mx-auto my-2' type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUser;
