const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem')

router.post('/', async (req, res) => {
    try{
      const data = req.body  // Assuming the request body contains the Menus data 
  
    // Create a new MenuItem document using the mongoose model
    const newMenuItem = new MenuItem(data); 
  
    // Save the new person to the database
    const response = await newMenuItem.save();
    console.log('Data saved');
    res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: "Internal Server Error"});
    }
})
  
// Get method to get the person
router.get('/', async (req, res)=> {
    try{
      const data = await MenuItem.find();
      console.log('Data fetch');
    res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: "Internal Server Error"});
    }
})

router.get('/:taste', async(req,res)=>{
  try{
    const taste = req.params.taste;
    if(taste == 'Sweet' || taste == 'Spicy' || taste == 'Soar'){
      const response = await MenuItem.find({taste: taste});
      console.log('Response fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'Invalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
})

router.put('/:id', async (req,res)=>{
  try{
    const menuItemId = req.params.id; // Extract the id from the URL parameter
    const updatedMenuData = req.body; // Updated data for the MenuItem

    const response = await MenuItem.findByIdAndUpdate(menuItemId,updatedMenuData, {
      new: true, // Return the updated document
      runValidators: true // Run Mongoose validation
    })

    if(!response){
      return res.status(404).json({error: 'Menu Item not found'})
    }

    console.log('Data updated');
    res.status(200).json(response);

  }catch(err){
      console.log(err);
      res.status(500).json({error: "Internal Server Error"});
  }
})

router.delete('/:id', async (req,res)=>{
  try{
    const menuItemId = req.params.id; // Extract the id from the URL parameter

    // Assuming you have a person model
    const response = await MenuItem.findByIdAndDelete(menuItemId);

    if(!response){
      return res.status(404).json({error: 'Menu Item not found'})
    }

    console.log('Data deleted');
    res.status(200).json({message: "Menu Item deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({error: "Internal Server Error"});
  }
})

module.exports = router;  