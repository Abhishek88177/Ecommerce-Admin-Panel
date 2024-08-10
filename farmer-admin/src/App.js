
import './App.css';
import Dashboard from './Component/Dashboard';
import {Router,Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import AllContent from './Component/DashboardContent/AllContent';
import Users from './Component/Users/Users';
import Products from './Component/Products/Products';
import Category from './Component/Category/Category';
import ProfilePage from './Component/AdminUser/ProfilePage';
import AllOrders from './Component/OrderPage/AllOrders';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './Component/LoginRegister/AdminLogin';
import ProtectedRoute from './Component/navbar/ProtectedRoute';
import { useContext } from 'react';
import AuthContext from './context/AuthProvider';

function App() {

  const {autherization , token ,role} = useContext(AuthContext);

  return (
    <main>
      <BrowserRouter>
      <Routes>

        <Route path="/login" element={<AdminLogin />}/>

        {/* <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />}>
                            <Route index element={<AllContent />} />
                            <Route path="user" element={<Users />} />
                            <Route path="product" element={<Products />} />
                            <Route path="category" element={<Category />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="order" element={<AllOrders />} />
                        </Route>
                    </Route> */}

        {/* <Route element={<ProtectedRoute requiredRole="ADMIN" />}> */}

        {
          token != null ? (
            <Route path="/" element={<Dashboard />}>
          <Route index element={<AllContent />} />
          <Route path="/user" element={<Users />} /> 
          <Route path="/product" element={<Products />} /> 
          <Route path="/category" element={<Category />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/order" element={<AllOrders />} /> 
        </Route>
          )
        :
        <Route path="*" element={<Navigate to="/login" />} />
        }
          

    {/* {role !== 'ADMIN' && <Route path="*" element={<Navigate to="/login" />} />} */}
        
        {/* </Route> */}
        </Routes>
      </BrowserRouter>

    </main>
  );
}

export default App;
