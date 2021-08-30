import React from 'react'
import {useState, useEffect, useRef, useCallback} from 'react'

import {getWeather, getWeatherByCity} from '../../API'
import {Weather} from "../../components/weather";
import {Dimmer, Loader} from "semantic-ui-react";

export const Home = () => {

    const latRef = useRef(0)
    const longRef = useRef(0)

    const [weatherData, setWeatherData] = useState(undefined)

    const handleUpdateDataByCity = useCallback((city) => {
        setWeatherData(undefined)
        getWeatherByCity(city)
            .then(response => response.data)
            .then(data => setWeatherData(data))
            .catch((error) => {
                if(error.response.status === 404){
                    handleUpdateData()
                }
            })
    }, [])

    const handleUpdateData = useCallback(() => {
        setWeatherData(undefined)
        navigator.geolocation.getCurrentPosition((pos) => {
            latRef.current = pos.coords.latitude
            longRef.current = pos.coords.longitude
        })
        getWeather(latRef.current, longRef.current)
            .then(response => response.data)
            .then(data => setWeatherData(data))
    }, [])

    useEffect(() => {
        handleUpdateData()
    }, [latRef.current, longRef.current])

    return (
        <>
            {weatherData ? <Weather onUpdateData={handleUpdateData} onUpdateDataByCity={handleUpdateDataByCity}
                                    weatherData={weatherData}/> :
                <Dimmer active>
                    <Loader>Loading..</Loader>
                </Dimmer>}
        </>
    )
}

