import React from "react";
import moment from 'moment'
import { Button } from "semantic-ui-react";
import { Card, CardBlock, CardBody, CardElement, CardHeader, CardHeaderInput } from "./components"
import { useState, useEffect } from "react"

export const Weather = ({weatherData, onUpdateData}) => {

    const [inputValue, setInputValue] = useState(weatherData.name)

    const handleInputChange = (e) => {
        setInputValue(e.currentTarget.value)
    }

    useEffect(() => {
        setInputValue(weatherData.name)
    },[weatherData])

    return (
        <Card>
            <CardHeader>
                <CardHeaderInput type='text' value={inputValue} onChange={handleInputChange}/>
                <Button onClick={event => onUpdateData(inputValue)}>Find</Button>
                <Button className="button" inverted color='red' circular icon='refresh' onClick={event => onUpdateData(null)}/>
            </CardHeader>
            <CardBody>
                <CardBlock>
                    <CardElement>Weather: {weatherData.weather[0].description}</CardElement>
                    <CardElement>Temp: {(weatherData.main.temp - 273.15).toFixed(2)} &deg;C</CardElement>
                </CardBlock>
                <CardBlock>
                    <CardElement>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</CardElement>
                    <CardElement>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</CardElement>
                </CardBlock>
                <CardBlock>
                    <CardElement>Day: {moment().format('dddd')}</CardElement>
                    <CardElement>Date: {moment().format('LL')}</CardElement>
                </CardBlock>
            </CardBody>
        </Card>
    )
}