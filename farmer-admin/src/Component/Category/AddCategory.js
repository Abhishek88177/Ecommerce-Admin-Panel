import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert'; 
import axiosInstance from '../../context/AxiosConfig';

const AddCategory = ({ onSave  }) => {
  const [form, setForm] = useState({
    // catId:'',
    catName: '',
    catType: '',
    catImages: null
  });

  

  const handleChange = (e) => {

    if(e.target.name === 'catImages'){
        setForm({ ...form, catImages : e.target.files[0]});
    }else{
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    }
  };

  const config = {
    headers : {
        'Content-Type' : 'multipart/form-data'
    },
    timeOut : 5000,
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("catName",form.catName);
    formData.append("catType",form.catType);
    formData.append("image",form.catImages);
    
    axiosInstance.post('/product/addCategory' , formData , config).then(response => {
        

        swal("Success!", "Your product has been saved!", "success");
        setForm({
        catName: '',
        catType: '',
        catImages: null
        });
    }) .catch(error => {
        console.error('There was an error!', error);
        swal("Error!", "There was an error saving your product!", "error");
      });


    
  };



  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">Add New Category</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="catImages" className="form-label">Image URL</label>
            <input type="file" className="form-control" id="catImages" name="catImages" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="catName" className="form-label">Category Name</label>
            <input type="text" className="form-control" id="catName" name="catName" value={form.catName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Category Type</label>
            <input type="text" className="form-control" id="catType" name="catType" value={form.catType} onChange={handleChange} required />

          </div>
          {/* <div className="mb-3">
            <label htmlFor="itemsQuantity" className="form-label">Items Quantity</label>
            <input type="number" className="form-control" id="itemsQuantity" name="itemsQuantity" value={form.itemsQuantity} onChange={handleChange} required />
          </div> */}
          {/* <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" className="form-control" id="price" name="price" value={form.price} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="catType" className="form-label">Category Type</label>
            <input type="text" className="form-control" id="catType" name="catType" value={form.catType} onChange={handleChange} required />
          </div> */}
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
