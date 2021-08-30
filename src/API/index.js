import {API_URL, API_KEY} from '../constants/index'
import axios from 'axios'

const instance = axios.create({
    baseURL: API_URL,
})

export const getWeather = (lat, long) => instance.get(`weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)

export const getWeatherByCity = city => instance.get(`weather?q=${city}&appid=${API_KEY}`)