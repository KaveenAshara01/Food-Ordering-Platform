import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodHome from './foodHome';
import DriverRegister from './DriverRegister';
import CustomerRegister from './CustomerRegister'; // Create this file
import Login from './login'; // Create this file
import RestaurantRegister from './restaurantregister';
import RestaurantLogin from './restaurantLogin';
import FoodItemsPage from './foodItemsPage';
import OrdersPage from './OrdersPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodHome />} />
        <Route path="/driver-register" element={<DriverRegister />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/restaurant-register" element={<RestaurantRegister />} />
        <Route path="/restaurant-login" element={<RestaurantLogin />} />
        <Route path="/food-items" element={<FoodItemsPage />} />
        <Route path="/orders" element={<OrdersPage />} />




      </Routes>
    </Router>
  );
}

export default App;
