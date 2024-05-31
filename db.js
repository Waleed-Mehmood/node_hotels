const mongoose = require('mongoose');

// Define the MongoDB Connection URl
const mongoURL = "mongodb://localhost:27017/hotels";

// set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDb connection.
const db = mongoose.connection;


// Define event listners for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDB Server');
})

db.on('error',(err)=>{
    console.error('MongoDB connection error',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})


//Export the database connection 
module.exports = db;