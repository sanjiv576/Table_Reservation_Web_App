import React, { useState } from 'react';
import './css/AddReview.css';
import restaurantService from '../../services/restaurantService';
export default function AddReview({ restaurantId, onAddReview }) {

    const [review, setReview] = useState('');

    const handleAddReview = (event) => {
        event.preventDefault();
        const addedReview = {
            text: review
        };
        restaurantService.addReview(restaurantId, addedReview)
            .then(res => {

                // update reviews
                // onAddReview(review);
                setReview('');
                return;
            })
            .catch(err => {
                window.alert(err.response.data.error);
            });
        setReview('')

    }

    return (
        <div>
            <div className="review-section">
                <br />
                <form onSubmit={handleAddReview}>
                    <input
                        value={review}
                        type="text"
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Enter your review ...'
                        required />
                    {' '}
                    <input type="submit" value={'Add Review'} />
                </form>
            </div>
        </div>
    )
}
