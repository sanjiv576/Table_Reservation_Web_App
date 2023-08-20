import React, { useEffect, useState } from 'react';
import restaurantService from '../../../services/restaurantService';
import OwnerNavbar from './OwnerNavbar';
import './css/OwnerProfile.css';
import userService from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
export default function OwnerProfile() {
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState({});
  const [reservations, setReservations] = useState({});
  const [file, setFile] = useState(null);

  const navigate = useNavigate();



  useEffect(() => {
    const restaurantId = window.localStorage.getItem('restaurantId');

    restaurantService.getARestaurant(restaurantId)
      .then(res => {
        // console.log(res.data);
        setReviews(res.data.reviews)
        setReservations(res.data.reservations)
        setRestaurant(res.data);
      })
      .catch(err => {
        window.alert(err.response.data.error);
      });
  }, [])

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedContent = {
      name: restaurant.name,
      location: restaurant.location,
      contact: restaurant.contact

    }

    const confirmationUpdate = window.confirm('Are you sure want to update ?');
    if (confirmationUpdate) {
      restaurantService.updateRestaurant(restaurant.id, updatedContent)
        .then(res => {
          setRestaurant(res.data);
        })
        .catch(err => window.alert(err.response.data.error));
    }



  };
  const handleUpload = (e) => {

    if (!file) {
      e.preventDefault();

      alert('File is empty');
      return;
    }
    const confirmationUpload = window.confirm('Are you sure want to upload picture ?');
    if (confirmationUpload) {
      userService.uploadImage(file)
        .then(res => {
          console.log(res.data);
          setRestaurant({ ...restaurant, picture: res.data.filename });

        })
        .catch(err => window.alert(err.response.data.error));

    }

  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    const confirmationDelete = window.confirm('Are you sure want to delete account ?');
    if (confirmationDelete) {
      const userId = window.localStorage.getItem('userId');

      userService.deleteUserAccount(userId)
        .then(res => {
          window.localStorage.removeItem('userId');
          window.localStorage.removeItem('token');

          navigate('/');

        })
        .catch(err => window.alert(err.response.data.error));
    }
  };

  return (
    <div>
      <OwnerNavbar />
      <div class="profile-container">
        <div class="profile-picture">
          <img src={`http://localhost:3004/uploads/${restaurant.picture}`} alt='Restaurant Pic' />
        </div>
        <div class="profile-details">
          <div className="left-profile-details">
            <form onSubmit={handleEdit}>
              <div className="individual-container">
                <label htmlFor="" className='label-name'> Name : </label>
                <input
                  data-testId="name-id"
                  type="text"
                  value={restaurant.name}
                  onChange={(e) => setRestaurant({
                    ...restaurant,
                    name: e.target.value
                  })}
                  required
                />
              </div>

              <div className="individual-container">
                <label htmlFor="" className='label-name'>Location : </label>
                <input
                  data-testId="location-id"
                  type="text"
                  value={restaurant.location}
                  onChange={(e) => setRestaurant({
                    ...restaurant,
                    location: e.target.value
                  })}
                  required
                />
              </div>
              <div className="individual-container">
                <label htmlFor="" className='label-name'>Contact : </label>
                <input
                  data-testId="contact-id"
                  type="text"
                  value={restaurant.contact}
                  onChange={(e) => setRestaurant({
                    ...restaurant,
                    contact: e.target.value
                  })}
                  required
                />
              </div>
              <input type="submit" value='UPDATE' />

            </form>
          </div>
          <div className="right-profile-details">

            <label data-testId="label-restaurantName-id" htmlFor="" className='details'>Name : {restaurant.name}</label>
            <label data-testId="label-ownerName-id" htmlFor="" className='details'>Owner: {restaurant.ownerName}</label>
            <label data-testId="label-location-id" htmlFor="" className='details'>Location : {restaurant.location}</label>
            <label data-testId="label-contact-id" htmlFor="" className='details'>Contact : {restaurant.contact}</label>
            <label data-testId="label-reviews-id" htmlFor="" className='details'>Total Reviews : {reviews.length}</label>
            <label data-testId="label-reservations-id" htmlFor="" className='details'>Total Reservations : {reservations.length}</label>

          </div>

        </div>
      </div>
      <br />
      <form>
        <input
          data-testId="file-id"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required />

        <button className="btn btn-secondary" onClick={handleUpload}>Upload  Picture</button>

      </form>
      <br />
      <button className='btn btn-primary' onClick={handleDeleteAccount}>Delete Account</button>
      <br />
      <br />
    </div>
  )
}
