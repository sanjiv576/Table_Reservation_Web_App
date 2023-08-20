import React, { useEffect, useState } from 'react';
import ShoppingCart from './ShoppingCart';
import './css/FoodOrder.css';
import { useParams } from 'react-router-dom';
import restaurantService from '../../services/restaurantService';
import Navbar from '../Dashboard/Customer/Navbar';

export default function FoodOrder() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        restaurantService.getARestaurant(restaurantId)
            .then(res => {
                setRestaurant(res.data);

                restaurantService.getAFoodMenu(restaurantId)
                    .then(res => {
                        setFoodItems(res.data);
                    })
                    .catch(err => window.alert(err.response.data.error));
            })
            .catch(err => window.alert(err.response.data.error));

    }, [restaurantId]);

    const handleAddToCart = (foodItem, quantity) => {
        const updatedItems = [...selectedItems];
        const index = updatedItems.findIndex((item) => item.foodName === foodItem.foodName);

        if (index === -1) {
            updatedItems.push({ ...foodItem, quantity });
        } else {
            updatedItems[index].quantity += quantity;
        }

        setSelectedItems(updatedItems);
        // reset
        setQuantity(0);
    };

    return (
        <>
            <Navbar />
            <h1 id='restaurant-title'>Food Menu Of {restaurant.name}</h1>

            {
                foodItems.length === 0
                    ?
                    <h1 id='title'>No Food Menu</h1>

                    :
                    <div className="food-order-container">
                        <div className="food-items">
                            {foodItems.map((foodItem) => (
                                <div className="food-item" key={foodItem.id}>
                                    <p> Name : {foodItem.foodName}</p>
                                    <p>Price: Rs {foodItem.price}</p>
                                    <p>Food Type: {foodItem.foodType}</p>
                                    <input
                                        type="number"
                                        min="0"
                                        value={quantity}
                                        onChange={(event) => setQuantity(parseInt(event.target.value))}
                                        required
                                    />
                                    <button className='btn btn-primary' onClick={() => handleAddToCart(foodItem, quantity)}>Add to Cart</button>
                                </div>
                            ))}
                        </div>
                        <ShoppingCart selectedItems={selectedItems} restaurantId={restaurantId} />
                    </div>
            }
        </>
    );
}
