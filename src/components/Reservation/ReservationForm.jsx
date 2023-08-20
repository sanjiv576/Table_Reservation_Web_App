import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reservationService from '../../services/reservationService';
import './css/ReservationForm.css';


export default function ReservationForm({ restaurantId }) {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [location, setLocation] = useState(null);
    // console.log(`From Reservation form : Restaurant id : ${restaurantId}`)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();


        // renderAlert();
        const data = `Date : ${selectedDate} Time: ${selectedTime} Number of Dinner : ${numberOfPeople} TYpe : ${location}`;

        const confirmReserve = window.confirm(`Are you sure want to reserve: ${data}`);


        if (confirmReserve) {

            const reservationContent = {
                date: selectedDate,
                time: selectedTime,
                dinnerPlace: location,
                numberOfDinners: numberOfPeople
            }
            console.log(`Reservation DAta is : ${reservationContent}`);

            // create a reservation
            reservationService.createAReservation(restaurantId, reservationContent)
                .then((res) => {
                    window.alert('Reservation done successfully')
                    // Reset form fields
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setNumberOfPeople(1);
                    setLocation(null);

                    // navigate('/customerDashboard');
                    navigate(`/reservation/${restaurantId}/foodOrder`)
                })
                .catch((err) => {
                    console.log(err.response.data)
                    window.alert(err.response.data.error)

                })

        }

        // alert(`Date : ${selectedDate} Time: ${selectedTime} Number of Dinner : ${numberOfPeople} TYpe : ${location}`)


    };
    return (
        <div>
            <div className='top-container'>
                <h1 className='title bg-black'>Fill Reservation Form</h1>
                <form onSubmit={handleSubmit}>

                    <div className="input-container">
                        <label>Date </label>
                        <input
                            type="date"
                            name="username"
                            autoComplete='off'
                            value={selectedDate}

                            // placeholder='E.g. Jul 14, 2023'
                            onChange={(e) => { setSelectedDate(e.target.value) }}
                            required />
                    </div>

                    <div className="input-container">
                        <label>Time:</label>
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => { setSelectedTime(e.target.value) }}
                            required />
                    </div>

                    <div className="input-container">
                        <label>Number of People:</label>
                        <input
                            type="number"
                            min={1}
                            max={5}
                            value={numberOfPeople}
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Location:</label>

                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Select Place Type</option>
                            <option value="indoor">Indoor</option>
                            <option value="outdoor">Outdoor</option>

                            required
                        </select>
                    </div>

                    <button className='submit-button' type="submit">Reserve Table</button>
                </form>
            </div>
        </div>
    )
}
