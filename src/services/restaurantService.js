import axios from "axios";


const baseUrl = 'http://localhost:3004/restaurants';

const getToken = () => `bearer ${window.localStorage.getItem('token')}`;


const getAllRestaurants = () => {
    return axios.get(baseUrl, {
        // send token
        headers: {
            Authorization: getToken()
        }
    });
}

const createARestaurant = (restaurantContent) => {
    return axios.post(baseUrl, restaurantContent, {
        headers: {
            Authorization: getToken()

        }
    })
}

const getARestaurant = (restaurantId) => {
    const endpoint = `${baseUrl}/${restaurantId}`;
    return axios.get(endpoint, {
        headers: {
            Authorization: getToken()
        }
    })
}

const updateRestaurant = (restaurantId, updatedContent) => {
    return axios.put(`${baseUrl}/${restaurantId}`, updatedContent, {
        headers: { Authorization: getToken() }
    });
}


const getAllReviews = (restaurantId) => {
    return axios.get(`${baseUrl}/${restaurantId}/reviews`, {
        headers: { Authorization: getToken() }
    });
}

const getAReview = (restaurantId, reviewId) => {
    return axios.get(`${baseUrl}/${restaurantId}/reviews/${reviewId}`, {
        headers: { Authorization: getToken() }
    });
}

const addReview = (restaurantId, reviewContent) => {
    return axios.post(`${baseUrl}/${restaurantId}/reviews`, reviewContent, {
        headers: { Authorization: getToken() }
    });
}

const updateReview = (restaurantId, reviewId, updatedReviewContent) => {
    return axios.put(`${baseUrl}/${restaurantId}/reviews/${reviewId}`, updatedReviewContent, {
        headers: { Authorization: getToken() }
    });
}

const deleteReview = (restaurantId, reviewId) => {
    return axios.delete(`${baseUrl}/${restaurantId}/reviews/${reviewId}`, {
        headers: { Authorization: getToken() }
    });
}

const addFavorite = (restaurantId, favoriteContent) => {
    return axios.post(`${baseUrl}/${restaurantId}/favorite`, favoriteContent, {
        headers: { Authorization: getToken() }
    });
}

const deleteFavorite = (restaurantId, favoriteId) => {
    return axios.delete(`${baseUrl}/${restaurantId}/favorite/${favoriteId}`, {
        headers: { Authorization: getToken() }
    });
}

const getAllFavoriteRestaurants = () => {
    return axios.get(`${baseUrl}/getAll/favorite`, {
        headers: { Authorization: getToken() }
    });
}

const getAFoodMenu = (restaurantId) => {
    return axios.get(`${baseUrl}/${restaurantId}/menu`, {
        headers: { Authorization: getToken() }
    });
}

const addFoodItem = (restaurantId, foodItemContent) => {
    return axios.post(`${baseUrl}/${restaurantId}/menu`, foodItemContent, {
        headers: { Authorization: getToken() }
    });
}

const getAFoodItem = (restaurantId, foodItemId) => {
    return axios.get(`${baseUrl}/${restaurantId}/menu/${foodItemId}`, {
        headers: { Authorization: getToken() }
    });
}

const updateAFoodItem = (restaurantId, foodItemId, updatedFoodItemContent) => {
    return axios.put(`${baseUrl}/${restaurantId}/menu/${foodItemId}`, updatedFoodItemContent, {
        headers: { Authorization: getToken() }
    });
}

const deleteAFoodItem = (restaurantId, foodItemId) => {
    return axios.delete(`${baseUrl}/${restaurantId}/menu/${foodItemId}`, {
        headers: { Authorization: getToken() }
    });
}

const createFoodOrder = (restaurantId, orderContent) => {
    return axios.post(`${baseUrl}/${restaurantId}/foodOrder`, orderContent, {
        headers: { Authorization: getToken() }
    });
}

const getAllFoodOrders = (restaurantId) => {
    return axios.get(`${baseUrl}/${restaurantId}/foodOrder`, {
        headers: { Authorization: getToken() }
    });
}
const restaurantService = {
    getAllRestaurants, createARestaurant, getAReview,
    getARestaurant, updateRestaurant, getAllReviews,
    addReview, updateReview, deleteReview, getAllFavoriteRestaurants,
    addFavorite, deleteFavorite, getAFoodItem, updateAFoodItem,
    getAFoodMenu, deleteAFoodItem, createFoodOrder, addFoodItem, getAllFoodOrders
}

export default restaurantService;
