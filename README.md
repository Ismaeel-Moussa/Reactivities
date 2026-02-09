# Reactivities - Social Events Platform

A full-stack social networking application designed to facilitate the creation, discovery, and management of social events. This project serves as a comprehensive demonstration of modern web development practices, featuring a robust backend built with .NET and a dynamic, responsive frontend using React.

**🌐 [Live Demo](https://reactivities-website.azurewebsites.net)** : https://reactivities-website.azurewebsites.net

### 🔑 Demo Credentials
* **Email:** `ismaeel.moussa@test.com`
* **Password:** `Pa$$w0rd`

---

### 🚀 Key Features
* **Event Management:** Users can create, view, edit, and cancel social activities with full CRUD functionality.
* **Real-time Interaction:** Integrated real-time chat functionality for event discussions using **SignalR**.
* **User Profiles:** Customizable user profiles, including photo uploads and a follower/following system.
* **Attendance Tracking:** Interactive management allowing users to join or leave events seamlessly.
* **Secure Authentication:** User identity management and authorization implemented with **JWT (JSON Web Tokens)**.

### 🛠 Technical Stack
* **Backend:** ASP.NET Core Web API, Entity Framework Core.
* **Frontend:** React, TypeScript, Material-UI, and Axios.
* **Database:** MS SQL Server.

### 🏛 Architecture & Design Patterns
* **Clean Architecture:** Built with a focus on separation of concerns for maintainability.
* **CQRS Pattern:** Utilizes Command Query Responsibility Segregation via the **MediatR** library.
* **Mapping:** Uses **AutoMapper** for efficient object-to-object mapping between entities and DTOs.
