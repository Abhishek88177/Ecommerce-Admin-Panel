import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/Sidebar.css';
import AuthContext from '../../context/AuthProvider';

const SideBar = ({ isOpen }) => {

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };


    return (


        //     <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px',height:'100vh'}}>
        //     <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        //       {/* <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
        //       <span class="fs-4">Sidebar</span>
        //     </a>
        //     <hr />
        //     <ul class="nav nav-pills flex-column mb-auto">
        //       <li class="nav-item">
        //         <a href="#" class="nav-link active" aria-current="page">
        //           {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg> */}
        //           Home
        //         </a>
        //       </li>
        //       <li>
        //         <a href="#" class="nav-link link-dark">
        //           {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> */}
        //           Dashboard
        //         </a>
        //       </li>
        //       <li>
        //         <a href="#" class="nav-link link-dark">
        //           {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg> */}
        //           Orders
        //         </a>
        //       </li>
        //       <li>
        //         <a href="#" class="nav-link link-dark">
        //           {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg> */}
        //           Products
        //         </a>
        //       </li>
        //       <li>
        //         <a href="#" class="nav-link link-dark">
        //           {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg> */}
        //           Customers
        //         </a>
        //       </li>
        //     </ul>
        //     <hr />
        //     <div class="dropdown">
        //       <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        //         <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
        //         <strong>mdo</strong>
        //       </a>
        //       <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        //         <li><a class="dropdown-item" href="#">New project...</a></li>
        //         <li><a class="dropdown-item" href="#">Settings</a></li>
        //         <li><a class="dropdown-item" href="#">Profile</a></li>
        //         <li><hr class="dropdown-divider" /></li>
        //         <li><a class="dropdown-item" href="#">Sign out</a></li>
        //       </ul>
        //     </div>
        //   </div>

        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <h2 className='text-light my-1'>Dashboard</h2>
            <hr className='text-light' />
            <ul>
                <Link to="/" className='link' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li>
                        <i className="fa fa-tachometer" aria-hidden="true"></i>
                        <span className="sidebar-text ms-2">Dashboard</span>
                    </li>
                </Link>

                <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li>
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <span className="sidebar-text ms-2 ">Users</span>
                    </li>
                </Link>

                <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li>
                        <i className="fa fa-cube" aria-hidden="true"></i>
                        <span className="sidebar-text ms-2 ">Product</span>
                    </li>
                </Link>

                <Link to="/category" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li>
                        <i className="fa fa-tags" aria-hidden="true"></i>
                        <span className="sidebar-text ms-2 ">Category</span>
                    </li>
                </Link>

                <Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li>
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span className="sidebar-text ms-2">Orders</span>
                    </li>
                </Link>

                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li>
                        <i className="fa fa-cogs" aria-hidden="true"></i>
                        <span className="sidebar-text ms-2">Settings</span>
                    </li>
                </Link>


                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLogout}>
                <li>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="sidebar-text ms-2">Logout</span>
                </li>
                </Link>
            </ul>
        </div>
    )
}

export default SideBar