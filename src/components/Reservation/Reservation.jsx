import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import restaurantService from '../../services/restaurantService'
import Navbar from '../Dashboard/Customer/Navbar'
import ReservationForm from './ReservationForm'
import './css/Reservation.css'
export default function Reservation() {
  const { restaurantId } = useParams()
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('photo0f72bb5b-4925-43ab-94ff-4453be672cca.png')
  


  useEffect(() => {
    restaurantService.getARestaurant(restaurantId)
      .then(res => {
        setName(res.data.name);
        setPicture(res.data.picture);
      })
      .catch(err => window.alert(err.response.data.error))
  }, [restaurantId]);

  return (

    <div>
      <Navbar />
      
      {/* <div className="hero max-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}> */}
      <div className="hero max-screen" style={{ backgroundImage: `url(http://localhost:3004/uploads/${picture})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            {/* <h1 className="mb-5 text-5xl font-bold">{restaurant.name}</h1> */}
            <h1 className="mb-5 text-5xl font-bold text-white" id='my-title'>{name}</h1>
            <p className="mb-5">Find comfortable tables and have great moments with your loved ones. Enjoy the dinner.</p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    


      <ReservationForm restaurantId={restaurantId}/>


    </div>


  )
}
