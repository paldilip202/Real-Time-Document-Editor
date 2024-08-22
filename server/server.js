const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  url: 'redis://redis:6379' // Use URL to specify Redis server location
});

redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});

// No need to call connect() separately for redis.createClient() method
// redisClient.connect();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/collaborativeDocs')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Document Schema
const DocumentSchema = new mongoose.Schema({
  content: String,
}, { timestamps: true });

const Document = mongoose.model('Document', DocumentSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io events
io.on('connection', socket => {
  console.log('A user connected:', socket.id);

  socket.on('get-document', async (documentId) => {
    try {
      const cachedDocument = await redisClient.get(documentId);

      if (cachedDocument) {
        socket.join(documentId);
        socket.emit('load-document', JSON.parse(cachedDocument));
      } else {
        const document = await Document.findById(documentId);
        if (document) {
          socket.join(documentId);
          socket.emit('load-document', document.content);
          await redisClient.set(documentId, JSON.stringify(document.content));
        }
      }

      socket.on('send-changes', (delta) => {
        socket.to(documentId).emit('receive-changes', delta);
      });

      socket.on('save-document', async (content) => {
        await Document.findByIdAndUpdate(documentId, { content });
        await redisClient.set(documentId, JSON.stringify(content));
      });
    } catch (err) {
      console.error('Error handling document:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('Real-Time Collaborative Document Editor Backend');
});

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
