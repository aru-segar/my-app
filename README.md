
## Real-time Event Ticketing System - w2051831

This project simulates a real-time event ticketing system to demonstrate the use of Object-Oriented Programming (OOP) and the implementation of the Producer-Consumer pattern in a multithreaded environment.

---

### Author Details

- **Name**: Aruniga Gnanasegaran
- **UoW ID**: w2052001
- **IIT ID**: 20232024
- **Email**: aruniga.20232024@iit.ac.lk

---

### Project Introduction

This project is part of the **Object-Oriented Programming (5COSC019C)** coursework and simulates a real-time event ticketing system using the Producer-Consumer architecture. It includes customer and vendor threads modifying a shared ticket pool.

#### 1. Java CLI 💻
A basic implementation built with Java, offering a Command Line Interface (CLI) for user interaction and configuration persistence through file storage.

#### 2. Full-stack Application 🌐
A complete implementation with:
- **Backend**: Spring Boot
- **Frontend**: React
- **Database**: SQLite

---

### Prerequisites

#### Backend
- Java JDK 17 or higher ☕
- Maven 3.8.x 🔧
- SQLite 3.x 📦
- Spring Boot 3.2.x ⚙️

#### Frontend
- Node.js 18.x or higher 🔵
- npm 9.x or higher 📦
- React  18.3.1 or higher 🎨

#### Java CLI
- Java JDK 23 ☕

---

### Getting Started
1. **Clone the Repository for Backend**:
    ```bash
    git clone https://github.com/aru-segar/ticketing-system.git
    ```
    2. **Clone the Repository for Frontend**:
    ```bash
    git clone https://github.com/aru-segar/my-app.git
    ```
     2. **Clone the Repository for Java CLI**:
    ```bash
    git clone https://github.com/aru-segar/CLI.git
    ```


---

#### Backend Setup

1. Install dependencies:
    ```bash
    ./mvnw clean install
    ```

2. Start the backend server:
    ```bash
    ./mvnw spring-boot:run
    ```

The server will be available at: `http://localhost:8080`

---

#### Frontend Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the frontend server:
    ```bash
    ng serve
    ```

The frontend will be available at: `http://localhost:3000`

---

### API Documentation

#### Base URL
`http://localhost:8080/ticketing-system`

---

### System Control 🎮

- **Start System**  
  `POST /api/system/start`

- **Stop System**  
  `POST /api/system/stop`

---

### Configuration ⚙️

- **Save Configuration**  
  `POST /api/configuration`  
  Example request body:
    ```json
    {
      "maxTicketCapacity": 50,
      "totalTickets": 40,
      "ticketReleaseRate": 2,
      "customerRetrievalRate": 3,
    }
    ```

- **Load Configuration**  
  `GET /api/configuration`

---

### Vendor Management 🛠️

- **Add Vendor**  
  `POST /api/vendors/add`

- **Remove Vendor**  
  `POST /api/vendors/remove`

---

### Customer Management 👥

- **Add Customer**  
  `POST /api/customers/add`

- **Remove Customer**  
  `POST /api/customers/remove`

---

### Simulation Stats 📊

- **Get Simulation Stats**  
  `GET /api/charts/sales-data`


---

