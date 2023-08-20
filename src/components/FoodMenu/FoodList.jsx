import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom';
import restaurantService from '../../services/restaurantService';
import './css/FoodList.css';

const FoodList = ({ updateFoodItem }) => {

    const [foodItems, setFoodItems] = useState([]);
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [ownerId, setOwnerId] = useState('');
    const [singleFoodItem, setSingleFoodItem] = useState({});
    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [foodType, setFoodType] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // for showing react modal
    // ReactModal.setAppElement('#root');

    const handleFoodItemEdit = (foodItemId) => {
        setModalIsOpen(true);

        restaurantService.getAFoodItem(restaurantId, foodItemId)
            .then(res => {
                setSingleFoodItem(res.data);

                // fill in the inputs for update
                setFoodName(res.data.foodName);
                setPrice(res.data.price);
                setFoodType(res.data.foodType);


            })
            .catch(err => window.alert(err.response.data.error));
    }

    const acutalEditFoodItem = (event) => {
        event.preventDefault();

        const updateConfiramtion = window.confirm('Are you sure want to update ?');

        if (updateConfiramtion) {

            const updatedFoodItemContent = {
                foodName: foodName,
                price: price,
                foodType: foodType
            };

            restaurantService.updateAFoodItem(restaurantId, singleFoodItem.id, updatedFoodItemContent)
                .then(res => {
                    setModalIsOpen(false);
                    setSingleFoodItem({});

                    const latestFoodItems = foodItems.map(foodItem => {
                        if (foodItem.id === singleFoodItem.id) {
                            foodItem = res.data;
                        }

                        return foodItem;
                    });
                    setFoodItems(latestFoodItems);



                })
                .catch(err => window.alert(err.response.data.error));
        }
    }

    const handleFoodItemDelete = (foodItemId) => {

        const deleteConfirmation = window.confirm('Are you sure want to delete ?');
        if (deleteConfirmation) {
            restaurantService.deleteAFoodItem(restaurantId, foodItemId)
                .then(res => {
                    console.log(res.data)
                    console.log('Deleted successfully')
                    const latestFoodItems = foodItems.filter(foodItem => foodItem.id !== foodItemId);
                    setFoodItems(latestFoodItems);
                })
                .catch(err => window.alert(err.response.data.error));
        }

    }


    useEffect(() => {
        restaurantService.getARestaurant(restaurantId)
            .then(res => {
                setRestaurant(res.data);
                setOwnerId(res.data.ownerId);

                restaurantService.getAFoodMenu(restaurantId)
                    .then(res => {
                        setFoodItems(res.data);
                    })
                    .catch(err => window.alert(err.response.data.error));
            })
            .catch(err => window.alert(err.response.data.error));
    }, [restaurantId, updateFoodItem]);

    return (
        <>
            <h1 id='restaurant-name'>Food Menu of {restaurant.name}</h1>
            <div className="menu-container">
                {
                    foodItems.length === 0
                        ?
                        <h1 id='menu-content'>No Food Menu</h1>
                        :
                        <div className="food-list">
                            {foodItems.map((foodItem) => (
                                <div key={foodItem.id} className="food-item">
                                    <p className="food-name">{foodItem.foodName}</p>
                                    <p className="food-price">Price: Rs {foodItem.price.toFixed(2)}</p>
                                    <p className="food-type">Food Type: {foodItem.foodType}</p>

                                    {
                                        window.localStorage.getItem('userId') === ownerId
                                            ?
                                            <>
                                                <button className='btn btn-primary' onClick={() => handleFoodItemEdit(foodItem.id)}>Edit</button>
                                                <button className='btn btn-secondary' onClick={() => handleFoodItemDelete(foodItem.id)}>Delete</button>
                                            </>
                                            : null
                                    }
                                </div>
                            ))}
                        </div>
                }
            </div>


            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <div className="outer-main-section">
                    <div className="menu-entry-section">
                        <form onSubmit={acutalEditFoodItem}>
                            <div className="flex-container">
                                <div className="flex-item">
                                    <input
                                        type="text"
                                        placeholder="Enter food item name"
                                        value={foodName}
                                        onChange={(e) => setFoodName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-item">
                                    <input
                                        type="text"
                                        placeholder="Enter food price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-item">
                                    <select
                                        value={foodType}
                                        onChange={(e) => setFoodType(e.target.value)}
                                        className="select select-bordered w-full max-w-xs"
                                    >
                                        <option disabled value="">
                                            Select Food Type
                                        </option>
                                        <option value="non-veg">Non-Veg</option>
                                        <option value="veg">Veg</option>
                                    </select>
                                </div>
                                <div className="flex-item">
                                    <input type="submit" value="Update Item" />
                                    {' '}
                                    <button className='btn btn-accent' onClick={() => setModalIsOpen(false)}> Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="menu-view-section"></div>
                </div>
            </ReactModal>
        </>
    );
};

export default FoodList;
