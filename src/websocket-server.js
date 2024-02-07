const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket Server\n');
});

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server });

// Object to store connected clients
let clients = {};

// Event handler for new WebSocket connections
wss.on('connection', (ws) => {
    // Handle new connection
    ws.on('message', (message) => {
        // Parse the JSON message
        const data = JSON.parse(message);

        // Handle different message types
        switch (data.type) {
            case 'join':
                // Add user to clients object
                clients[data.username] = ws;

                // Broadcast the user list to all clients
                broadcastUserList();
                break;

            case 'message':
                // Send the message to the target user
                if (clients[data.target]) {
                    clients[data.target].send(JSON.stringify({
                        type: 'message',
                        sender: data.sender,
                        text: data.text,
                    }));
                }
                break;
        }
    });

    // Event handler for WebSocket connection close
    ws.on('close', () => {
        // Handle client disconnect
        const username = getUsernameBySocket(ws);
        if (username) {
            delete clients[username];
            broadcastUserList();
        }
    });
});

// Broadcast the user list to all connected clients
function broadcastUserList() {
    const userlist = Object.keys(clients);
    const userListMessage = JSON.stringify({ type: 'userlist', users: userlist });

    // Broadcast user list to all clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(userListMessage);
        }
    });
}

// Get the username associated with a WebSocket
function getUsernameBySocket(socket) {
    for (const [username, clientSocket] of Object.entries(clients)) {
        if (clientSocket === socket) {
            return username;
        }
    }
    return null;
}

// Define the server port
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Import and configure the Socket.io server
const { Server } = require('socket.io');

module.exports = (httpServer) => {
    // Create a Socket.io server attached to the HTTP server
    const io = new Server(httpServer);

    // Event handler for new Socket.io connections
    io.on('connection', (socket) => {
        console.log('Un client s\'est connecté');

        // Event handler for incoming messages
        socket.on('message', (message) => {
            // Broadcast the message to all clients, including the sender
            io.emit('message', message);
        });

        // Event handler for client disconnection
        socket.on('disconnect', () => {
            console.log('Un client s\'est déconnecté');
        });
    });
};
