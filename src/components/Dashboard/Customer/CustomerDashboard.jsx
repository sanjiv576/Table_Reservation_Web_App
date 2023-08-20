import React, { useEffect, useState } from 'react';
import restaurantService from '../../../services/restaurantService';
import { useAuth } from '../../../utils/authContext';
import Navbar from './Navbar';
import RestaurantCard from './RestaurantCard';
// import './css/customerDashboard.css';
export default function CustomerDashboard() {

  // all restaurants
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {

    // set user id in the local storage
    // window.localStorage.setItem('userId', auth.user.id);
    // console.log(`User id from local storage ${window.localStorage.getItem('userId')}`)

    restaurantService.getAllRestaurants()
      .then(res => {
        // console.log(res.data);
        setRestaurants(res.data);
      })
      .catch(err => window.alert(err.response.data.error))

  }, []);

  const auth = useAuth();
  return (
    <div>
      <div className='outer-div'></div>
      <Navbar />
      <RestaurantCard restaurants={restaurants} />
    </div>
  )
}
