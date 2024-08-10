// src/components/AddUserModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUserModal = ({ show, handleClose, handleSave }) => {


  // useEffect(()=>{
  //   getCurrentLocation()
  // },[])

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...userData, signedUp: new Date().toLocaleDateString() };
    console.log(newUser)
    // handleSave(newUser);
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
              name="name"
              value={userData.name}
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
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={userData.phone}
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
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
