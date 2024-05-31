const mongoose = require('mongoose');

// Define the Person schema 
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    }
})

// Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;





// Notes:
// If you want to explicitly specify a different collection name, you can do so by passing the desired collection name as the third argument when creating the model using mongoose.model(). For example:
// "const Person = mongoose.model('Person', personSchema, 'my_custom_collection_name');"