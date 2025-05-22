const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// conn MongoDB
try {
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  console.log("mongodb connected");
} catch (error) {
  console.log(error);
}

// API routes
const postRoutes = require('./routes/postRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/post', postRoutes);
app.use('/api/notifications', notificationRoutes);

// static files
const staticPath = path.join(__dirname, 'public');
console.log('Static path:', staticPath);
app.use(express.static(staticPath));

// main route
app.get('/', (req, res) => {
  res.render('index');
});

// 404
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// debuggings here
// catch-all
app.use((req, res) => {
  res.render('index');
});

// error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
