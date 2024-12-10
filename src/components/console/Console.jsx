import React, { useEffect, useState } from 'react';
import './Console.css'; // Import the CSS file for styling

const Console = () => {
    const [logs, setLogs] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const socketConnection = new WebSocket('http://localhost:8080/ticketing-system/ws');

        socketConnection.onopen = () => {
            console.log('Connected to WebSocket');
        };

        socketConnection.onmessage = (event) => {
            console.log('Message from server:', event.data);
            setLogs((prevLogs) => [...prevLogs, event.data]);
        };

        socketConnection.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        socketConnection.onclose = (event) => {
            console.log('WebSocket closed:', event);
        };

        setSocket(socketConnection);

        return () => {
            if (socketConnection) {
                socketConnection.close();
            }
        };
    }, []);

    return (
        <div className="backend-console-container">
            <h2 className="console-title">Real-Time Transactions</h2>
            <div className="log-console">
                {logs.length === 0 ? (
                    <p className="no-logs">Logs will appear here...</p>
                ) : (
                    logs.map((log, index) => (
                        <p key={index} className="log-message">{log}</p>
                    ))
                )}
            </div>
        </div>
    );
};

export default Console;
