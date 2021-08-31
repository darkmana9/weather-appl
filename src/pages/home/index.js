import React from 'react'
import {useState, useEffect, useRef, useCallback} from 'react'

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

    const handleUpdateDataByCity = useCallback((city) => {
        getWeatherByCity(city)
            .then((response) => {
                setWeatherData(undefined)
                return response
            })
            .then(response => response.data)
            .then(data => setWeatherData(data))
            .catch((error) => {
                if (error.response.status === 404) {
                    handleUpdateData()
                }
            })
    }, [])

    const handleUpdateData = useCallback(async () => {
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

