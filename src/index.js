const express = require("express");
const server = express();
const PORT = 4000;
const routes = require('./routes');
const { initDB } = require('./services/db')

server.use(express.json());

server.use('/api', routes);

server.listen(PORT, () => {
    initDB()
    console.log(`el servidor esta escuchando en el puerto: ${PORT}`);
})