
import axios from "axios";

const baseUrl = 'http://localhost:3004/users';
const getToken = () => `bearer ${window.localStorage.getItem('token')}`;

const login = (userCredentials) => {
    return axios.post(`${baseUrl}/login`, userCredentials);
};

const register = (user) => {
    return axios.post(`${baseUrl}/register`, user);
}


// get user account details
const getUserDetails = (userId) => {
    return axios.get(`${baseUrl}/${userId}`, {
        headers: { Authorization: getToken() }

    });

}

// update user account credentials
const editUserDetails = (userId, updatedContent) => {
    return axios.put(`${baseUrl}/${userId}`, updatedContent, {
        headers: { Authorization: getToken() }

    });

}

// update user account credentials
const deleteUserAccount = (userId) => {
    return axios.delete(`${baseUrl}/${userId}`, {
        headers: { Authorization: getToken() }

    });

}

// upload file or image
const uploadImage = (selectedImageFile) => {
    const formData = new FormData();
    formData.append('photo', selectedImageFile);

    const config = {
        headers: {
            Authorization: getToken(),
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios.post('http://localhost:3004/uploads', formData, config);
};

const userLogout = () => {
    return axios.post(`${baseUrl}/logout`, {}, {
        headers: { Authorization: getToken() }

    });
}

const userService = { login, register, getUserDetails, editUserDetails, deleteUserAccount, uploadImage, userLogout };

export default userService;