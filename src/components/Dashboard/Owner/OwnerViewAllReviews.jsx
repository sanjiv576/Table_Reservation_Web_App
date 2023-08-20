import React, { useEffect, useState } from 'react'
import OwnerNavbar from './OwnerNavbar'
import restaurantService from '../../../services/restaurantService';

export default function OwnerViewAllReviews() {
    const [reviews, setReviews] = useState([]);

    const restaurantId = window.localStorage.getItem('restaurantId');

    useEffect(() => {
        restaurantService.getAllReviews(restaurantId)
            .then(res => {
                console.log(res.data)
                setReviews(res.data);
            })
            .catch(err => window.alert(err.response.data.error));
    }, [restaurantId]);
    return (
        <div>
            <OwnerNavbar />

            <div className="main-section">
                {
                    reviews.length === 0
                        ?
                        <div className="title-section">
                            <h1 id='title-header'>No Reviews Yet !</h1>
                        </div>
                        :
                        <>
                            <div className="title-section">
                                <h1 id='title-header'>Reviews</h1>
                            </div>
                            <div className="favorite-section">

                                <div className="overflow-x-auto">
                                    <table className="table table-xs table-sm table-md table-lg table-zebra">
                                        {/* head */}
                                        <thead>
                                            <tr>

                                                <th>User Name</th>
                                                <th>Text</th>
                                                <th>Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                reviews.map(singleReview =>
                                                    <tr key={singleReview.id}>

                                                        <td>
                                                            <div className="flex items-center space-x-3">

                                                                <div>
                                                                    <div className="font-bold">{singleReview.userName}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {singleReview.text}

                                                        </td>
                                                        <td>{singleReview.rating}</td>

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
