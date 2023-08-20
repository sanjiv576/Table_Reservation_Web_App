import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './css/FoodOrderConfirmation.css'
import Navbar from '../Dashboard/Customer/Navbar';
export default function FoodOrderConfirmation() {

    const navigate = useNavigate();

    const { restaurantId } = useParams();

    const handleOrder = (event) => {
        event.preventDefault();

        navigate(`/foodOrder/${restaurantId}`);
    }
    const handleSkip = (event) => {
        event.preventDefault();
        navigate(`/restaurant/${restaurantId}`);
    }
    return (
        <>
            <Navbar />
            <div className='body-container'>
                <div class="buttons-container">
                    <button className='btn btn-primary' onClick={handleOrder}>Food Order</button>
                    <button className='btn btn-secondary' onClick={handleSkip}>Skip</button>
                </div>
            </div>
        </>
    )
}
