import React, { useContext, useEffect, useState } from 'react';
import '../../assets/css/ProfilePage.css';
import AuthContext from '../../context/AuthProvider';
import axiosInstance from '../../context/AxiosConfig';


const ProfilePage = () => {

  const {user} = useContext(AuthContext);
  const [userData , setUserData] = useState("");

  useEffect(()=>{
    getByUserName()
  },[])

    const getByUserName = async () => {
      try{
      const response = await axiosInstance.get(`/api/v1/user/getUserByusername/${user}`)
      console.log(response.data)
      setUserData(response.data)
      }catch(error){
        console.log("error")
      }
    }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-card-body">
          <img
            src="https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?cs=srgb&dl=pexels-mali-102104.jpg&fm=jpg"
            alt="Profile"
            className="profile-img"
          />
          <h5 className="profile-card-title">{user}</h5>
          <p className="profile-card-text">{userData.email}</p>
          <p className="profile-card-text">{userData.location}</p>
          <button className="upload-btn">Upload picture</button>
        </div>
      </div>
      {/* <div className="form-card">
        <div className="form-card-header">
          <h5>Profile</h5>
          <p className="text-muted">The information can be edited</p>
        </div>

        <hr />
        <div className="form-card-body">
          <form>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text" className="form-input" id="firstName" value="Sofia" required />
              </div>
              <div className="form-col">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input type="text" className="form-input" id="lastName" value="Rivers" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-input" id="email" value="sofia@devias.io" required />
              </div>
              <div className="form-col">
                <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                <input type="tel" className="form-input" id="phoneNumber" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="state" className="form-label">State</label>
                <select className="form-select" id="state" value="Alabama">
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="Arkansas">Arkansas</option>
                  <option value="California">California</option>
                  
                </select>
              </div>
              <div className="form-col">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-input" id="city" />
              </div>
            </div>
            <button type="submit" className="save-btn">Save details</button>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default ProfilePage;
