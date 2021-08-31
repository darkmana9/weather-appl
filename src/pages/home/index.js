import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Dimmer, Loader } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";

import { getWeather } from '../../API'
import { Weather } from "../../components/weather";

import 'react-toastify/dist/ReactToastify.css'

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
        await toast.promise(
            setWeather(latRef.current, longRef.current, city),
            {
                pending: 'Getting data...',
                success: 'Data received 👌',
                error: 'Something wrong'
            }
        )
    }, [getPosition, setWeather])


    useEffect(() => {
        handleUpdateData()
    }, [handleUpdateData])

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

