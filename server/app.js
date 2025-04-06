 const express = require('express');
 const cors = require('cors');
 const mongoose = require('mongoose');
 require("dotenv").config();
 
 const app = express();
 const authRoutes = require('./routes/auth');
 const protectedRoute = require('./routes/protectedRoute');
 app.use(cors());
 app.use(express.json());
 
 //app.use('/auth', authRoutes);
 //app.use('/protected', protectedRoute);
 
 //const PORT = process.env.PORT || 5000;
 //app.listen(PORT, () => {
 // console.log(`Server is running on port ${PORT}`);
 //});

const PORT = process.env.PORT || 5000;
//const MONGO_URI = 'mongodb://127.0.0.1:27017/jwt-auth-demo';
const MONGO_URI = process.env.MONGODB_URI;
console.log(MONGO_URI);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    app.use('/auth', authRoutes);
    app.use('/protected', protectedRoute);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();