import React from 'react';
import restaurantService from '../../services/restaurantService';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ selectedItems, restaurantId }) => {
    const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const navigate = useNavigate();
    const handleFoodOrder = () => {
        if (total === 0) {
            alert('Please, select food items.');
        } else {
            const orderData = {
                date: new Date().toISOString(),
                time: new Date().toLocaleTimeString(),
                items: selectedItems.map(item => ({
                    foodName: item.foodName,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: total,

            };
            console.log(orderData);

            const orderConfirmation = window.confirm('Are you sure want order foods ?');
            if (orderConfirmation) {
                restaurantService.createFoodOrder(restaurantId, orderData)
                    .then(res => {
                        console.log(res.data)
                        console.log('Ordered successfully')

                        navigate(`/restaurant/${restaurantId}`);
                        
                    })
                    .catch(err => window.alert(err.response.data.error));
            }
        }
    };

    return (
        <div className="shopping-cart">
            <h1>Food Order Cart</h1>
            <ul>
                {selectedItems.map((item) => (
                    <li key={item.foodName}>
                        Name -  {item.foodName}
                        {' '}
                        Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            <p><strong>Total Price: Rs{' '}{total}</strong></p>
            <br />
            <button className='btn btn-primary' onClick={handleFoodOrder}>Order</button>
        </div>
    );
};

export default ShoppingCart;
