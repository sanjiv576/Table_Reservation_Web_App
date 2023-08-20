import React, { useState } from 'react';
import OwnerNavbar from '../Dashboard/Owner/OwnerNavbar';
import FoodList from './FoodList';
import './css/AddFood.css';
import restaurantService from '../../services/restaurantService';


export default function AddFood() {

    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [foodType, setFoodType] = useState('non-veg');

    const [updateFoodItem, setUpdateFoodItem] = useState({});

    const handleAddFood = (evt) => {
        evt.preventDefault();

        const confirmation = window.confirm(`Are you want to add ${foodName} at price ${price} ?`);
        if (confirmation) {

            const newFoodItem = {
                foodName: foodName,
                price: parseFloat(price),
                foodType: foodType
            }
            const restaurantId = window.localStorage.getItem('restaurantId');
            restaurantService.addFoodItem(restaurantId, newFoodItem)
                .then(res => {
                    console.log(res.data);
                    setUpdateFoodItem(res.data);
                    setFoodName('');
                    setFoodType('non-veg');
                    setPrice('');
                })
                .catch(err => window.alert(err.response.data.error));
        }
    }
    return (
        <div>
            <OwnerNavbar />

            <div className="outer-main-section">
                <div className="menu-entry-section">
                    <form onSubmit={handleAddFood}>
                        <div class="flex-container">
                            <div class="flex-item"> <input
                                type="text"
                                placeholder='Enter food item name'
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                                required
                            /></div>
                            <div class="flex-item">
                                <input
                                    type="text"
                                    placeholder='Enter food price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="flex-item">


                                <select

                                    value={foodType}
                                    onChange={(e) => setFoodType(e.target.value)}
                                    className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Select Food Type</option>
                                    <option value="non-veg">Non-Veg</option>
                                    <option value="veg">Veg</option>

                                    required
                                </select>
                            </div>
                            <div class="flex-item">
                                <input type="submit" value={'Add Item'} />

                            </div>
                        </div>

                    </form>
                </div>

                <div className="menu-view-section">
                    <FoodList updateFoodItem={updateFoodItem} />
                </div>
            </div>

        </div>
    )
}
