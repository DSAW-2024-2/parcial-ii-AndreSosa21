const express = require('express');
const axios = require('axios');
const route_weather= express.Router();

route_weather.get('/', (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'latitud or longitude not found' });
    }
    
    axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
        latitude: latitude,
        longitude: longitude,
        current_weather: true, // Para obtener la temperatura actual
    }
    })
.then(response => {
    
    const temperature = response.data.current_weather.temperature;
    res.json({ temperature });
})
.catch(error => {
    res.status(500).json({ error: 'Error al consultar la API de Open Meteo' });
})

});


module.exports = route_weather;
