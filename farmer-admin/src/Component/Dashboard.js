import MainNavbar from "./navbar/MainNavbar";
import SideBar from "./navbar/SideBar";
import '../assets/css/Dashboard.css';
import { useState } from "react";
import StatCards from "./DashboardContent/StatCard";
import LatestProducts from "./DashboardContent/LatestProducts";
import LatestOrders from "./DashboardContent/LatestOrdes";
import Users from "./Users/Users";
import { Outlet } from "react-router-dom";


function Dashboard() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="App">
            <SideBar isOpen={isSidebarOpen} />
            <MainNavbar toggleSidebar={toggleSidebar} />
            <div className={`content ${isSidebarOpen ? '' : 'collapsed'}`}>

                <Outlet />
                {/* <Users /> */}
                
            </div>
        </div>



        
    );
};



export default Dashboard;