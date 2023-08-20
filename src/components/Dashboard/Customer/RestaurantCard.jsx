import React from 'react';
import { Link } from 'react-router-dom';
import './css/restaurantCard.css';
export default function RestaurantCard({ restaurants }) {

    return (
        <div>
            {
                restaurants.map(restaurant => (
                    <div key={restaurant.id} data-testId="restaurant-card">
                        <div className="card w-96 bg-base-100 shadow-xl restaurant-single-card">
                            <figure><img src={`http://localhost:3004/uploads/${restaurant.picture}`} alt="Restaurant" /></figure>

                            <div className="card-body restaurant-body">
                                <h2 className="card-title">
                                    {restaurant.name}
                                    {/* <div className="badge badge-secondary">NEW</div> */}
                                </h2>
                                <div className='restaurant-details text-left'>
                                    <p> Location: {restaurant.location}</p>
                                    <p> Contact: {restaurant.contact}</p>
                                    <p> {' '} Reviews: {restaurant.reviews.length}</p>
                                </div>
                                <div className="card-actions">

                                    <button className="btn btn-active">
                                        <Link to={`/reservation/${restaurant.id}`}>Reserve now</Link>

                                    </button>
                                    <button className="btn btn-active">

                                        <Link to={`/restaurant/${restaurant.id}`}>View</Link>

                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>

                ))
            }
        </div>
    )
}
