import axios from "axios";

const baseUrl = 'http://localhost:3004/reservations';
const getToken = () => `bearer ${window.localStorage.getItem('token')}`;


const createAReservation = (restaurantId, reservationContent) => {
    console.log(getToken())

    const endpoint = `${baseUrl}/user/${restaurantId}`;
    return axios.post(endpoint, reservationContent, {
        headers: {
            Authorization: getToken()
        }
    })
}

// get all customer reservations
const getAllReservationsByCustomer = () => {
    return axios.get(baseUrl, {
        headers: { Authorization: getToken() }
    })
}

// get a single reservation
const getAReservation = (reservationId) => {
    return axios.get(`${baseUrl}/${reservationId}`, {
        headers: { Authorization: getToken() }
    })
}

// get all reservations by owner
const getAllReservationsByOwner = (restaurantId) => {
    return axios.get(`${baseUrl}/user/${restaurantId}`, {
        headers: { Authorization: getToken() }
    });
}

// update a reservation

const editAReservation = (reservationId, editedContent) => {
    return axios.put(`${baseUrl}/${reservationId}`, editedContent, {
        headers: { Authorization: getToken() }
    })
}


// delete a reservation
const deleteAReservation = (reservationId) => {
    return axios.delete(`${baseUrl}/${reservationId}`, {
        headers: { Authorization: getToken() }
    })
}


const reservationService = { 
    createAReservation, getAllReservationsByCustomer, 
    getAReservation, editAReservation , 
    deleteAReservation, getAllReservationsByOwner}

export default reservationService;