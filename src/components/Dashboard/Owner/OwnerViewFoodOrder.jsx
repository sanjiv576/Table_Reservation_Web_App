import React, { useEffect, useState } from 'react'
import restaurantService from '../../../services/restaurantService';
import OwnerNavbar from './OwnerNavbar';

export default function OwnerViewFoodOrder() {

    const [foodOrders, setFoodOrders] = useState([]);
    const restaurantId = window.localStorage.getItem('restaurantId');
    useEffect(() => {
        restaurantService.getAllFoodOrders(restaurantId)
            .then(res => {
                console.log(res.data)
                setFoodOrders(res.data);
            })

            .catch(err => window.alert(err.response.data.error));

    }, [restaurantId]);
    return (
        <div>
            <OwnerNavbar />
            <div className="main-section">
                {
                    foodOrders.length === 0
                        ?
                        <div className="title-section">
                            <h1 id='title-header'>No Food Orders Yet !</h1>
                        </div>
                        :
                        <>
                            <div className="title-section">
                                <h1 id='title-header'>Food Orders</h1>
                            </div>
                            <div className="favorite-section">

                                <div className="overflow-x-auto">
                                    <table className="table table-xs table-sm table-md table-lg">
                                        {/* head */}
                                        <thead>
                                            <tr>

                                                <th>User Name</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Food Items</th>
                                                <th>Total amount</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                foodOrders.map(singleFoodOrder =>
                                                    <tr key={singleFoodOrder.id}>

                                                        <td>
                                                            <div className="flex items-center space-x-3">

                                                                <div>
                                                                    <div className="font-bold">{singleFoodOrder.userName}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {singleFoodOrder.date}

                                                        </td>
                                                        <td>{singleFoodOrder.time}</td>
                                                        <td>
                                                            {singleFoodOrder.items.map((singleItem) => (
                                                                <div key={singleItem._id}>
                                                                    {singleItem.foodName} x {singleItem.quantity}
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td>{singleFoodOrder.totalAmount}</td>


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
