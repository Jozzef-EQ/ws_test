const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(__dirname + '/public'));
/* app.get('/test', (req, res)=>{
    res.send('hola');
}); */

io.on('connection', (socket) => {
    /* socket.on('join', (room) => {
        socket.join(room);
        console.log(`Usuario ${socket.id} unido al canal ${room}`);
    }); */
    console.log(`Usuario ${socket.id} unido al canal...`);

    socket.on('sendTrip', (data) => {
        console.log(`Pasajero solicitando taxi...`);
        io.emit('requestTrip', 'Viaje solicitado');
    });

    socket.on('tripAcceptedByDriver', (data) => {
        console.log(`Viaje aceptado por conductor...`);
        io.emit('tripAccepted', 'Viaje aceptado');
    })

    socket.on('llegoOrigen', (data) => {
        console.log(`El conductor llego al punto de origen...`);
        io.emit('conductorLlegoOrigen', 'Conductor llego al punto de origen');
    })
    socket.on('iniciarViaje', (data) => {
        console.log(`El conductor inicio el viaje con el pasajero...`);
        io.emit('iniciandoViaje', 'Conductor inicio el viaje con pasajero');
    })
    /* socket.on('recogerPasajero', (data) => {
        console.log(`Recogiendo Pasajero...`);
        io.emit('recogiendoPasajero', 'Recogiendo a pasajero');
    }) */
    socket.on('finalizarViaje', (data) => {
        console.log(`Finalizando viaje...`);
        io.emit('finalizandoViaje', 'Finalizando viaje');
    })

    socket.on('cmt', (data) => {
        console.log(`Habilitando que se encuentra dentro de los 100 metros...`);
        io.emit('habilitarCMT', 'cerca a los 100 metros');
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor de Socket.io escuchando en el puerto ${PORT}`);
});