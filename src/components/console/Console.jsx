import React, { useEffect, useState } from 'react';
import './Console.css'; // Import the CSS file for styling

const Console = () => {
    const [logs, setLogs] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        let socketConnection;

        const initializeWebSocket = () => {
            socketConnection = new WebSocket('ws://localhost:8080/ticketing-system/ws');

            socketConnection.onopen = () => {
                console.log('Connected to WebSocket');
                setLogs((prevLogs) => [...prevLogs, 'Connected to WebSocket.']);
            };

            socketConnection.onmessage = (event) => {
                console.log('Message from server:', event.data);
                setLogs((prevLogs) => {
                    const MAX_LOGS = 100; // Limit to 100 logs to prevent memory issues
                    const newLogs = [...prevLogs, event.data];
                    return newLogs.length > MAX_LOGS ? newLogs.slice(1) : newLogs;
                });
            };

            socketConnection.onerror = (error) => {
                console.error('WebSocket Error:', error);
                setLogs((prevLogs) => [...prevLogs, 'WebSocket connection error occurred.']);
            };

            socketConnection.onclose = (event) => {
                console.log('WebSocket closed:', event);
                setLogs((prevLogs) => [...prevLogs, 'WebSocket connection closed. Attempting to reconnect...']);
                retryConnection();
            };

            setSocket(socketConnection);
        };

        const retryConnection = () => {
            setTimeout(() => {
                console.log('Retrying WebSocket connection...');
                initializeWebSocket();
            }, 5000); // Retry after 5 seconds
        };

        initializeWebSocket();

        return () => {
            if (socketConnection && socketConnection.readyState === WebSocket.OPEN) {
                socketConnection.close();
            }
        };
    }, []);

    return (
        <div className="backend-console-container">
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
