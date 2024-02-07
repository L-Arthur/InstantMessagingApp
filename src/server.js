const express = require('express');
const http = require('http');
const configureWebSocket = require('./websocket-server');

// Create an Express application
const app = express();

// Create an HTTP server using the Express app
const httpServer = http.createServer(app);

// Define the server port
const PORT = process.env.PORT || 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to your Express server!');
});

// Configure WebSocket functionality
configureWebSocket(httpServer);

// Start the HTTP server
httpServer.listen(PORT, () => {
    console.log(`HTTP server is running on port ${PORT}`);
});
