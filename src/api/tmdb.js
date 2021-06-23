import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    // baseURL: process.env.TMDB_URL
})

export default instance