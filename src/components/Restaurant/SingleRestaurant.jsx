import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Dashboard/Customer/Navbar';
import restaurantService from '../../services/restaurantService';
import './css/SingleRestaurant.css'
import AddReview from './AddReview';
import ShowReviews from './ShowReviews';
import { GrFavorite } from "react-icons/gr";
import { HiHeart } from "react-icons/hi";

export default function SingleRestaurant() {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [favorite, setFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState('');
    const [reviews, setReviews] = useState([]);

    const[addedReview, setAddedReview] = useState({});
    

    useEffect(() => {
        restaurantService.getARestaurant(restaurantId)
            .then(res => {

                setRestaurant(res.data);
                setReviews(res.data.reviews);

                // check whether it is marked as favorite or not

                for (var singleFavorite of res.data.favorites) {
                    if (singleFavorite.userId === window.localStorage.getItem('userId')) {
                        setFavorite(true);
                        setFavoriteId(singleFavorite.id);
                        return;
                    }
                }
            })
            .catch(err => window.alert(err.response.data.error));


    }, [restaurantId]);

    const handleFavorite = (event) => {
        event.preventDefault();
        // alert();
        if (favorite) {
            // delete as favorite in the server 
            restaurantService.deleteFavorite(restaurantId, favoriteId)
                .then(res => {
                    setFavorite(false);
                    setFavoriteId('');
                })
                .catch(err => window.alert(err.response.data.error));

        }
        else {
            // add as favorite in the server 
            const favoriteContent = {

            }
            restaurantService.addFavorite(restaurantId, favoriteContent)
                .then(res => {
                    setFavorite(true);
                    setFavoriteId(res.data.id);
                })
                .catch(err => window.alert(err.response.data.error));

        }
    }

    const handleAddReview = (newReviewText) => {
        const addedReview = {
            text: newReviewText
        };
        restaurantService.addReview(restaurantId, addedReview)
            .then(res => {
                // update the reviews state with the newly added review
                setReviews([...reviews, res.data]);
                setAddedReview(res.data);
            })
            .catch(err => {
                window.alert(err.response.data.error);
            });
    };

    

    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="upper-container">
                    <img src={`http://localhost:3004/uploads/${restaurant.picture}`} alt="Restaurant Pic" />
                    <div className="name-container">
                        <h1 className='text-white'>{restaurant.name}</h1>
                    </div>
                </div>
                <div className="middle-container">
                    <div className="details-container">
                        <h3>Descripiton</h3>
                        <br />
                        <br />
                        <p>
                            <strong>{restaurant.name} </strong> is owned by <strong>{restaurant.ownerName}</strong>.
                            It is located at <strong>{restaurant.location}</strong>. The restaurant remains open from <strong>7am - 10pm</strong>.
                            You can call us at <strong>{restaurant.contact}</strong> for reservation or any query.
                            
                            Or just click on <strong>Reservation Now</strong> to reserve your table either in <strong>'Outdoor'</strong> or <strong>'Indoor'</strong>.
                            Likewise, you can view food menu as clicked on <strong>'View Food Menu'</strong>. 
                            You can order food only after reserving the table or skip it.

                        </p>
                    </div>
                    <div className="buttons-container">
                        <button className='btn btn-accent'><Link to={`/reservation/${restaurantId}`}>Reservation Now</Link></button>
                        {/* <button className='btn btn-secondary'><Link to={`/foodOrder/${restaurantId}`}>Food Order Now</Link></button> */}
                        <button className='btn btn-secondary'><Link to={`/viewMenu/${restaurantId}`}>View Food Menu</Link></button>
                    </div>
                </div>
                <br />
                <div className="lower-container">
                    <div className="favorite-section">
                        {
                            favorite ?
                                <HiHeart size={35} className='icon' onClick={handleFavorite} />
                                :
                                <GrFavorite size={35} className='icon' onClick={handleFavorite} />

                        }
                        <label htmlFor="" className='iconLabel'> Add To Favorite</label>
                    </div>
                    <br />
                    <div className="add-review-container">
                        <h3>Reviews</h3>
                        <br />
                        {/* <AddReview restaurantId={restaurantId} /> */}
                        <AddReview restaurantId={restaurantId} onAddReview={handleAddReview} />

                    </div>
                    <br />
                    <div className="review-container">
                        {/* <ShowReviews restaurantId={restaurantId} /> */}
                        <ShowReviews restaurantId={restaurantId} recentlyAddedReview={addedReview}/>
                    </div>

                </div>
            </div>
        </div>
    )
}
