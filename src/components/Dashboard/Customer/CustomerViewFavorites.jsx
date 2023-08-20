import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './css/CustomerViewFavorites.css'
import restaurantService from '../../../services/restaurantService';

export default function CustomerViewFavorites() {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {

        restaurantService.getAllFavoriteRestaurants()
            .then(res => {
                console.log(res.data);
                setRestaurants(res.data);
            })
            .catch(err => window.alert(err.response.data.error));


    }, []);
    return (
        <div>
            <Navbar />
            <div className="main-section">
                {
                    restaurants.length === 0
                        ?
                        <div className="title-section">
                            <h1 id='title-header'>No Favorite Restaurants Yet !</h1>
                        </div>
                        :
                        <>
                            <div className="title-section">
                                <h1 id='title-header'>My Favorite Restaurants</h1>
                            </div>
                            <div className="favorite-section">

                                <div className="overflow-x-auto">
                                    <table className="table table-xs table-sm table-md table-lg">
                                        {/* head */}
                                        <thead>
                                            <tr>

                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Contact</th>
                                                <th>Owner Name</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                restaurants.map(favoriteResaurant =>
                                                    <tr key={favoriteResaurant.id}>

                                                        <td>
                                                            <div className="flex items-center space-x-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={`http://localhost:3004/uploads/${favoriteResaurant.picture}`} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{favoriteResaurant.restaurantsName}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {favoriteResaurant.location}

                                                        </td>
                                                        <td>{favoriteResaurant.contact}</td>
                                                        <td>{favoriteResaurant.ownerName}</td>


                                                    </tr>)
                                            }
                                        </tbody>


                                    </table>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
