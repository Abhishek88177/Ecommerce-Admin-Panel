import React, { useContext } from 'react'
import '../../assets/css/MainNavbar.css';
import AuthContext from '../../context/AuthProvider';

const MainNavbar =({ toggleSidebar })=> {

  const { user } = useContext(AuthContext);
  return (
    <>
        {/* <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav> */}


<div className="top-navbar">
            <button className="menu-button" onClick={toggleSidebar}>
                ☰
            </button>
            <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>


            <div className="profile">
            
                <i className="fa fa-bell mx-2" aria-hidden="true"></i>

                 <i className="fa fa-users mx-2" aria-hidden="true"></i>
                 <p className='my-auto ms-3'>Welcome {user}</p>
                <img src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Profile" />
            </div>
        </div>    </>
  )
}

export default MainNavbar