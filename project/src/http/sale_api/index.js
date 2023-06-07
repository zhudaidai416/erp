import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3060',
});

export default http;