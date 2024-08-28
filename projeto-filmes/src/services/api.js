//chave b3c2a8f74a0e861f1d0342cd52ca657e
//base url https://api.themoviedb.org/3/
//url da api movie/now_playing?api_key=b3c2a8f74a0e861f1d0342cd52ca657e&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;