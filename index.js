const express = require('express');
const app = express();

const route_weather=require('./weather');
const route_login=require('./login');
const { authenticate } = require('./authentication');


const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

app.use('/weather', authenticate,route_weather);
app.use('/login', route_login);

// Ruta base de prueba (opcional)
app.get('/', (req, res) => {
    res.send('weather api');
});
app.use((req, res) => {
    res.status(404).json({ error: "Route not found, enter a valid route" });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server in ${port}`);
});


