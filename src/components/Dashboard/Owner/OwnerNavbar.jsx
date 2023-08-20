
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/OwnerNavbar.css';
import restaurantService from '../../../services/restaurantService';
import userService from '../../../services/userService';

export default function OwnerNavbar() {
  const location = useLocation();
  const [restaurant, setRestaurant] = useState({});

  const [restaurantId, setRestaurantId] = useState('');

  useEffect(() => {
    const restaurantId = window.localStorage.getItem('restaurantId');
    setRestaurantId(restaurantId);
    restaurantService.getARestaurant(restaurantId)
      .then(res => {
        console.log(res.data);
        setRestaurant(res.data);
      })
      .catch(err => {
        window.alert(err.response.data.error);
      });
  }, []);

  const handleLogout = () => {
    userService.userLogout()
      .then(res => {
        console.log(res.data);
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('restaurantId');
        window.localStorage.removeItem('token');
      })
      .catch(err => window.alert(err.response.data.error));
  }

  return (
    <div>
      <div className='main-container'>
        <div className='nav-container'>
          <nav className="navbar">
            <ul className="navbar-nav">

              <li className={`nav-item ${location.pathname === '/ownerProfile' ? 'active' : ''}`}>
                <Link to={'/ownerProfile'} className='nav-link'>Profile</Link>
                <div className="indicator"></div>
              </li>
              <li className={`nav-item ${location.pathname === '/ownerViewReservations' ? 'active' : ''}`}>
                <Link to={'/ownerViewReservations'} className='nav-link'>New Reservations</Link>
                <div className="indicator"></div>
              </li>
              <li className={`nav-item ${location.pathname === `/menu/addFoodItem/${restaurantId}` ? 'active' : ''}`}>
                <Link to={`/menu/addFoodItem/${restaurantId}`} className='nav-link'>Add Food Item</Link>
                <div className="indicator"></div>
              </li>
              <li className={`nav-item ${location.pathname === '/ownerViewFoodOrders' ? 'active' : ''}`}>
                <Link to={'/ownerViewFoodOrders'} className='nav-link'>View Food Orders</Link>
                <div className="indicator"></div>
              </li>
              <li className={`nav-item ${location.pathname === '/reviews' ? 'active' : ''}`}>
                <Link to={'/reviews'} className='nav-link'>View Reviews</Link>
                <div className="indicator"></div>
              </li>
              <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <Link to={'/'} className='nav-link' onClick={handleLogout}>Logout</Link>
                <div className="indicator"></div>
              </li>
            </ul>
          </nav>
        </div>
        <div className='left-body-container'>
          <label data-testId="label-id" tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={`http://localhost:3004/uploads/${restaurant.picture}`} alt='User Profile Pic' />
            </div>
          </label>
          <label className='text-black' htmlFor="">{restaurant.name}</label>
        </div>
      </div>
    </div>
  );
}
