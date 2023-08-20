import React, { useEffect, useState } from 'react'
import './css/ShowReviews.css'
import restaurantService from '../../services/restaurantService';



export default function ShowReviews({ restaurantId, recentlyAddedReview }) {
    console.log(`Recently added review  : ${recentlyAddedReview.text}}`);
    console.log(`Restaruantid from Show review : ${restaurantId}`)
    const [reviews, setReviews] = useState([]);
    const [updatedReview, setUpdatedReview] = useState('');
    const [updatedReviewId, setUpdateReviewId] = useState('');

    useEffect(() => {
        restaurantService.getAllReviews(restaurantId)
            .then(res => {

                setReviews(res.data);

                console.log(`Recently sdfasdf added review  : ${recentlyAddedReview.text}}`);


            })
            .catch(err => window.alert(err.response.data.error))

    }, [restaurantId, recentlyAddedReview]);

    const handleEdit = (reviewId) => {

        restaurantService.getAReview(restaurantId, reviewId)
            .then(res => {
                // store review text to show in the input
                setUpdatedReview(res.data.text);

                // store review id for updating by clicking on update button
                setUpdateReviewId(reviewId);

            })
            .catch(err => window.alert(err.response.data.error));

        window.updateModal.showModal();
    }

    const actualUpdate = (event) => {
        event.preventDefault();
        const updatedReviewContent = {
            text: updatedReview
        };
        restaurantService.updateReview(restaurantId, updatedReviewId, updatedReviewContent)
            .then(res => {

                const latestUpdatedReviews = reviews.map(review => {
                    if (review.id === updatedReviewId) {
                        review = res.data;
                    }
                    return review;
                });
                // update reviews
                setReviews(latestUpdatedReviews);

                // reset 
                setUpdatedReview('');
                setUpdateReviewId('')

                // close modal
                window.updateModal.close();
            })
            .catch(err => window.alert(err.response.data.error));
    }

    const handleDelete = (reviewId) => {

        const deleteConfirmation = window.confirm('Are you sure want to delete review ?');
        if (deleteConfirmation) {
            restaurantService.deleteReview(restaurantId, reviewId)
                .then(res => {

                    // review after deleted
                    const currentReviews = reviews.filter(review => review.id !== reviewId);
                    setReviews(currentReviews);

                })
                .catch(err => window.alert(err.response.data.error));
        }

    }

    return (
        <div>
            {
                reviews.map(singleReview => (
                    <div class="single-review-container" key={singleReview.id}>
                        <div class="avatar">
                            <img src={`http://localhost:3004/uploads/${singleReview.userPicture}`} alt="User Profile" />
                        </div>
                        <div class="content">
                            <p class="username">{singleReview.userName}</p>
                            <br />
                            <p class="review-text">{singleReview.text}</p>
                        </div>
                        <div class="actions">
                            <div class="dropdown">
                                <button class="dropbtn">...</button>
                                <div class="dropdown-content">

                                    {
                                        singleReview.userId === window.localStorage.getItem('userId') ? (
                                            <>
                                                <button class="edit-btn" onClick={() => handleEdit(singleReview.id)}>Edit</button>
                                                <button class="delete-btn" onClick={() => handleDelete(singleReview.id)}>Delete</button>
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            <dialog id="updateModal" className="modal">
                <button htmlFor="updateModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.updateModal.close()}>✕</button>

                <form method="dialog" className="modal-box">
                    <input
                        className="input input-bordered input-warning w-full max-w-xs"
                        type="text"
                        value={updatedReview}
                        onChange={(e) => setUpdatedReview(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary" onClick={actualUpdate}>Update</button>
                </form>
            </dialog>
        </div>
    )
}
