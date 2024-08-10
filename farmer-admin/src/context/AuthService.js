import axios from "axios";

// src/services/authService.js
export const loginService = async (loginData) => {
    
    // const response = await fetch('http://localhost:8083/api/v1/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: loginData,
    // });

    // axios.post('http://localhost:8083/api/v1/auth/login', loginData).then(response => {
    //     if (response) {
    //         console.log(response.data)
    //             localStorage.setItem('token', response.data.token);
    //             localStorage.setItem('user', JSON.stringify(loginData.username));
    //             localStorage.setItem('role', JSON.stringify(response.data.role));
    //             return response.data.role;
    //         } else {
    //             throw new Error('Login failed');
    //         }
    // })


    try {
        const response = await axios.post('http://localhost:8083/api/v1/auth/login', loginData);

        if (response && response.data) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(loginData.username));
            return response.data.role;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Login failed', error);
        throw error; // Ensure the error is thrown so it can be caught by the caller
    }
    
    // if (response.token) {
    //     localStorage.setItem('token', data.token);
    //     localStorage.setItem('user', JSON.stringify(data.user));
    //     return data.user;
    // } else {
    //     throw new Error('Login failed');
    // }
};
