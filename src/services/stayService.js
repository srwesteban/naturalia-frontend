import axios from 'axios';

const API_BASE = 'http://localhost:8080/stays'; // ajusta si cambias puerto/host

export const createStay = (stay) => axios.post(API_BASE, stay);
export const fetchRandomStays = () => axios.get(`${API_BASE}`); // lo usaremos luego
