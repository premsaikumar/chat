const WebSocket = require('ws');

// Create a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:4000');

// Event handler for when the connection is open
ws.on('open', function () {
    console.log('Connected to WebSocket server');

    // Send a message to the server
    const messageData = { text: 'Hello, server!' };
    ws.send(JSON.stringify(messageData));
});

// Event handler for when a message is received from the server
ws.on('message', function (data) {
    console.log('Received raw data:', data);

    // Convert buffer to string
    const dataString = data.toString();

    try {
        // Attempt to decode JSON data
        const parsedData = JSON.parse(dataString);
        console.log('Decoded data:', parsedData);
    } catch (error) {
        console.log('Received non-JSON message:', dataString);
    }

    // Close the connection after receiving a response (optional)
    ws.close();
});

// Event handler for when the connection is closed
ws.on('close', function () {
    console.log('Disconnected from WebSocket server');
});

// Event handler for errors
ws.on('error', function (error) {
    console.error('WebSocket error:', error);
});
