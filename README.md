
# Real-Time Document Editor

Real-Time Document Editor is a web application that allows multiple users to edit documents simultaneously in real-time. This project uses Docker for containerization and Redis for caching, along with MongoDB for document storage. It provides features such as rich text formatting, real-time updates, and document versioning.




## Key Features

* Real-Time Collaboration: Multiple users can  edit the same document simultaneously with instant updates.
* Rich Text Formatting: Supports text styling, lists, and other formatting options.
* Document Persistence: Changes are saved and persisted in MongoDB.
* Conflict Resolution: Efficient handling of simultaneous edits by multiple users.
* Version Control: Track and manage document versions.
* Caching: Redis for caching document data to enhance performance.
## Tech Stack

* Frontend: React.js with Quill.js
* Backend: Node.js and Express with Socket.io
* Database: MongoDB
* Caching: Redis
* Containerization: Docker
## Getting Started

### Prerequisites

Ensure you have the following installed:

1. Docker (for containerization)
2. Docker Compose (for managing multi-container Docker applications)


### 1. Clone the Repository

 
    git clone https://github.com/paldilip202/Real-Time-Document-Editor.git

    cd real-time-document-editor

### 2. Set Up Docker

 #### 1. Create Docker Images:

* Build the Docker images for the backend and Redis:

      docker-compose build


 #### 2. Start Docker Containers:

 * Start all services defined in the docker-compose.yml file:

       docker-compose up

This will start MongoDB, Redis, and the backend server. The backend server will be available at http://localhost:3001.

 #### 3. Accessing the Application:
 * Navigate to the frontend application in your browser at http://localhost:3000.
* Use a URL like http://localhost:3000/document/<documentId> to create or edit a document, where <documentId> is a unique identifier for the document.


### 3. Testing

* Collaborative Editing: Open multiple browser tabs or windows to test real-time collaboration. Changes made in one tab should be reflected in others.

##  Contributing

### Contributions are welcome! To contribute:

* Fork the repository.
* Create a new branch (git checkout -b feature/your-feature).
* Make your changes.
* Commit your changes (git commit -am 'Add new feature').
* Push to the branch (git push origin feature/your-feature).
* Create a Pull Request.
