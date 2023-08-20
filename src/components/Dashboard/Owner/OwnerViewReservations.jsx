import React, { useEffect, useState } from 'react'
import OwnerNavbar from './OwnerNavbar'
import './css/OwnerViewReservations.css'
import reservationService from '../../../services/reservationService';
export default function OwnerViewReservations() {

    const [reservations, setReservation] = useState([]);

    useEffect(() => {
        const restaurantId = window.localStorage.getItem('restaurantId');

        reservationService.getAllReservationsByOwner(restaurantId)
            .then(res => {
                console.log(res.data);
                setReservation(res.data);

            })
            .catch(err => {
                window.alert(err.response.data.error);
            });
    }, [])
    return (
        <div>
            <OwnerNavbar />

            {
                reservations.length === 0
                ?
                <h1 className='text-black'>No Reservations Yet!</h1>
                : 
                <div class="reservations-container">

                {
                    reservations.map(singleReservation => (
                        <div class="reservation-card" key={singleReservation.id}>
                            <div class="profile-picture">
                                <img src={`http://localhost:3004/uploads/${singleReservation.userPicture}`} alt='Restaurant Pic' />
                            </div>
                            <br />
                            <p>
                               <strong> Customer Name</strong> : {singleReservation.userName}
                                <br />
                                <strong>Date</strong> : {singleReservation.date}
                                <br />
                                <strong>Time</strong> : {singleReservation.time}
                                <br />
                                <strong>Number of dinners</strong> : {singleReservation.numberOfDinners}
                                <br />
                               <strong> Dinner place </strong>: {singleReservation.dinnerPlace}

                            </p>
                        
                        </div>
                    ))
                }

            </div>
            }
        </div>
    )
}
