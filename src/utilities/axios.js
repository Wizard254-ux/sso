import axios from 'axios';
import { getCookie } from './cookies';

axios.defaults.baseURL = process.env.REACT_APP_SERVER;

axios.interceptors.request.use(function (config) {
    // Get the user cookie which contains the token
    const userCookie = getCookie('user');
    console.log('User cookie:', userCookie ? 'Found (length: ' + userCookie.length + ')' : 'Not found');
    const usertoken = localStorage.getItem('refreshToken');
    if (userCookie) {
        try {
            // Parse the JSON string from the cookie
            const userData = JSON.parse(userCookie);
            console.log('Parsed user data:', userData ? 'Successfully parsed' : 'Failed to parse');
            console.log('Token exists:', userData && usertoken ? 'Yes' : 'No');
            
            // Extract the token from the parsed data
            if (userData && usertoken) {
                config.headers.Authorization = `Bearer ${usertoken}`;
                console.log('Authorization header set:', `Bearer ${usertoken.substring(0, 15)}...`);
            } else {
                console.log('No token found in user data');
            }
        } catch (error) {
            console.error('Error parsing user cookie:', error);
        }
    } else {
        console.log('No user cookie found');
    }
    
    console.log('Final headers:', config.headers);
    return config;
});
