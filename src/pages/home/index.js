import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Dimmer, Loader } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";

import {getWeather, getWeatherByCity} from '../../API'
import {Weather} from "../../components/weather";
import {Dimmer, Loader} from "semantic-ui-react";

export const Home = () => {

    const latRef = useRef(0)
    const longRef = useRef(0)

    const [weatherData, setWeatherData] = useState(undefined)

    const getPosition = useCallback(() => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }, [])

    const setWeather = useCallback((lat, long, city) => {
        return getWeather(lat, long, city)
            .then(response => response.data)
            .then(data => setWeatherData(data))
            .catch((error) => {
                if (error.response.status === 404) {
                    toast.warn('City not found', {
                        position: "top-center",
                    });
                }
            })
            .then(response => response.data)
            .then(data => setWeatherData(data))
            .catch((error) => {
                if (error.response.status === 404) {
                    handleUpdateData()
                }
            })
    }, [])

    const handleUpdateData = useCallback(async (city) => {
        await getPosition()
            .then((position) => {
                latRef.current = position.coords.latitude
                longRef.current = position.coords.longitude
            })
            .catch((err) => {
                toast.error(err, {
                    position: "top-center",
                });
            })
        await getWeather(latRef.current, longRef.current)
            .then(response => response.data)
            .then(data => setWeatherData(data))
    }, [getPosition])


    useEffect(() => {
        handleUpdateData()
    }, [])

    return (
        <>
            <ToastContainer/>
            {weatherData ? <Weather onUpdateData={handleUpdateData}
                                    weatherData={weatherData}/> :
                <Dimmer active>
                    <Loader>Loading..</Loader>
                </Dimmer>}
        </>
    )
}

