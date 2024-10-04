const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const route_login= express.Router();

dotenv.config();
const apiWeatherUser = {
    email: 'admin@admin.com',
    password: 'admin'
    
};

// POST Login
route_login.post('/', (req, res) => {
    const { email, password } = req.body;

    // Validar que el JSON esté completo
    if (!email || !password) {
        return res.status(400).json({ message: "JSON incomplete" });
    }

    // Validar credenciales
    if (email === apiWeatherUser.email && password === apiWeatherUser.password) {
        // Crear el token JWT
        const emailAuth = { email }; // Datos para el token
        const accessToken = generateToken(emailAuth);

        return res.status(200).json({ message: "welcome to open meteo", accessToken });
    } else {
        return res.status(401).json({ message: "incorrect data" });
    }
});

function generateToken(emailAuth) {
    //se pone fecha de expiracion para probar que el error 403 funciona en ambos casos
    return jwt.sign(emailAuth, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' });
}

module.exports = route_login;

