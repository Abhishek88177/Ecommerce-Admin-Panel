import React, { useEffect, useState } from 'react';
import '../../assets/css/categorytable.css';
import axios from 'axios';
import swal from 'sweetalert';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';
import axiosInstance from '../../context/AxiosConfig';

const CategoryTable = () => {

    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        getAllCategories()
    },[categories])

    const getAllCategories = async () => {
        try {
            const response = await axiosInstance.get('/product/getAllCategory');

            const categoryWithImages = await Promise.all(
                response.data.map(async (category) => {
                    try {
                        const imageResponse = await axiosInstance.get(`/product/catimage/${category.catId}`, {
                            responseType: 'blob',
                        });

                        const imageUrl = URL.createObjectURL(imageResponse.data);
                        return {
                            ...category,
                            catImages: imageUrl,
                        };
                    } catch (imageError) {
                        console.error(`Error fetching image for category ${category.catId}:`, imageError);
                        return category; // Return the category without the image URL if there was an error
                    }
                })
            );
            setCategories(categoryWithImages);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };




    const deleteCategory = async (id) => {
        try {
            const deleteResponse = await axiosInstance.delete(`/product/deletecategory/${id}`);
            console.log(deleteResponse.data);
            getAllCategories();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    const handleEditClick = (product) => {
        setSelectedCategory(product);
        setShowModal(true);
      };
    
      const handleClose = () => {
        setShowModal(false);
        setSelectedCategory(null);
      };

    return (
        <div className="card latest-category shadow-sm">
            <div className="card-header">
                Categories
            </div>
            <div className="table-responsive">
                <table className="table table-hover" style={{ height: '300px' }}>
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Cat Name</th>
                            <th scope="col">Cat Type</th>
                            <th scope="col">Quantity</th>
                            <th scope="col"><i className='fa fa-edit'></i></th>
                            <th scope="col"><i className='fa fa-trash'></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.catId}>
                                    <td><img src={category.catImages} width="70" /></td>
                                    <td>{category.catName}</td>
                                    <td>{category.catType}</td>
                                    <td className="text-center">{category.itemsQuantity}</td>

                                    <td>

                                        <a className='edit-icon'
                                            onClick={() => handleEditClick(category)}
                                        >
                                            <i className='fa fa-edit'></i>
                                        </a>

                                    </td>
                                    <td>

                                        <a className='delete-icon' onClick={() => {
                                            swal({
                                                title: "Are you sure?",
                                                text: "Once deleted, you will not be able to recover this Category!",
                                                icon: "warning",
                                                buttons: true,
                                                dangerMode: true,
                                            }).then((willDelete) => {
                                                if (willDelete) {
                                                    deleteCategory(category.catId);
                                                    swal("Poof! Your product has been deleted!", {
                                                        icon: "success",
                                                    });
                                                } else {
                                                    swal("Your category is safe!");
                                                }
                                            });
                                        }}>
                                            <i className='fa fa-trash'></i>
                                        </a>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No data present</td>
                            </tr>
                        )}
                    </tbody>

                </table>


                {selectedCategory && (
        <UpdateCategory
          show={showModal}
          handleClose={handleClose}
          data={selectedCategory}
        />
      )}
                
            </div>
        </div>
    );
};

export default CategoryTable;
