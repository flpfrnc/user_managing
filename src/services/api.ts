import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://user-managing-api.herokuapp.com/api/'
})