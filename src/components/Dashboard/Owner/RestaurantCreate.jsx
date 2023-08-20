import React, { useState } from 'react'
import './css/RestaurantCreate.css'
import restaurantService from '../../../services/restaurantService';
import { useNavigate } from 'react-router-dom';
export default function RestaurantCreate() {

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantContact, setRestaurantContact] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');

  const navigate = useNavigate();
  const handleCreate = (e) => {
    e.preventDefault();

    const restaurantDetails = {
      name: restaurantName,
      location: restaurantLocation,
      contact: restaurantContact
    }

    restaurantService.createARestaurant(restaurantDetails)
      .then(res => {
        console.log(res.data);
        alert('Restaurant has been created successfully');
        window.localStorage.setItem('restaurantId', res.data.id);
        navigate('/ownerProfile');

      })
      .catch(err => window.alert(err.response.data.error));
  }
  return (
    <div>
      {/* <h1 className='text-black'>Restaurant create</h1> */}
      <div className="main-container-section">
        <div className="restaurant-create-section">
          <h2 className='rest-title'>Fill the Restaruant Details</h2>
          <div className="restaurant-content">
            <form onSubmit={handleCreate}>
              <input
                data-testId="name-id"
                className='restaurant-input'
                type="text"
                value={restaurantName}
                placeholder='Enter restaurant name'
                onChange={(e) => setRestaurantName(e.target.value)}
                required
              />

              <input
                data-testId="location-id"
                className='restaurant-input'
                type="text"
                value={restaurantLocation}
                placeholder='Enter restaurant location'
                onChange={(e) => setRestaurantLocation(e.target.value)}
                required
              />

              <input
                data-testId="contact-id"
                className='restaurant-input'
                type="text"
                value={restaurantContact}
                placeholder='Enter restaurant contact'
                onChange={(e) => setRestaurantContact(e.target.value)}
                required
              />

              <input id='submit-btn' type="submit" value={'Create Restaurant'} />
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
