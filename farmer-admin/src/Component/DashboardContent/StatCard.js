// src/components/StatCard.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './../../assets/css/StatCard.css';
import axiosInstance from '../../context/AxiosConfig';

const StatCard = ({ title, value, icon }) => {
    return (
        <div className="card stat-card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title">{title}</h5>
                    <h2 className="card-value">{value}</h2>
                    {/* <p className={`card-change ${changeType === 'up' ? 'text-success' : 'text-danger'}`}>
                        {changeType === 'up' ? '↑' : '↓'} {change} Since last month
                    </p> */}
                </div>
                <div className={`icon-bg ${icon.bgColor}`}>
                    <i className={`fa ${icon.faClass}`} aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
};

const iconClasses = {
    budget: { faClass: 'fa-dollar', bgColor: 'bg-purple' },
    customers: { faClass: 'fa-users', bgColor: 'bg-green' },
    tasks: { faClass: 'fa-tasks', bgColor: 'bg-orange' },
    profit: { faClass: 'fa-line-chart', bgColor: 'bg-purple' }
};



const StatCards = () => {

    const [totalOrders ,setTotalOrders] = useState(0);
    const [totalEarning ,setTotalEarning] = useState(0);
    const [totalProducts ,setTotalProducts] = useState(0);

    useEffect(()=>{
        getAllData()
    },[])

    const getAllData = async() =>{
        try {
            const [totalEarningResponse ,totalOrdersResponse, totalProductsResponse] = await Promise.all([
                axiosInstance.get('/order/totalearning'),
                axiosInstance.get('/order/totalorders'),
                axiosInstance.get('/product/totalproduct')
            ]);

            console.log(totalOrdersResponse.data)
            console.log(totalEarningResponse.data)
            console.log(totalProductsResponse.data)
            setTotalOrders(totalOrdersResponse.data);
            setTotalEarning(totalEarningResponse.data);
            setTotalProducts(totalProductsResponse.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    const statCardsData = [
        { title: 'Earning', value: totalEarning, change: '12%', changeType: 'up', icon: iconClasses.budget },
        { title: 'TOTAL VISITS', value: '1.6k', change: '16%', changeType: 'down', icon: iconClasses.customers },
        { title: 'TASK ORDER', value: totalOrders, change: '', changeType: '', icon: iconClasses.tasks },
        { title: 'TOTAL PRODUCT', value: totalProducts, change: '', changeType: '', icon: iconClasses.profit }
    ];

    
    return (
        <div className="row">
            {statCardsData.map((card, index) => (
                <div key={index} className="col-md-3 mb-4">
                    <StatCard {...card} />
                </div>
            ))}
        </div>
    );
};

export default StatCards;
