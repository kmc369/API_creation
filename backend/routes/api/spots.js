const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const {User }= require('../../db/models')
const {SpotImage}= require('../../db/models')

// This route handler should be fine as it uses a middleware function

//get All Spots
router.get('/spots', async (req, res) => {
  try{
  const spots = await Spot.findAll();
  res.statusCode=200
  return res.json({spots});
  }catch(error){
    res.status(500)
  }
});


//GetSpotsBy Users

router.get('/spots/current', async(req,res)=>{
 
   const currentUser = req.user

   if(currentUser){
   const Spots = await currentUser.getSpots();
    res.statusCode = 200
    return res.json({Spots});
   
   }else{
  
   return res.json({message: "Spot couldn't be found"})

  }
})

//get details of spot by its id
router.get('/spots/:spotId', async (req, res) => {
  const {spotId} = req.params
  
  try{
  const spots = await Spot.findByPk(spotId,{
    
    include:[{
      model:SpotImage,
    },
    {
      model:User,
    }]
  
  })

  if(!spots){
    res.statusCode = 404
    return res.json({message:"Spot couldn't be found"})
  }

  return res.json({spots})
}catch(error){
  console.error('Error:', error);
  return res.status(500).json({ error: 'Internal server error' });
 
  
}
 
});



//create a spot 
router.post('/spots', async(req,res)=>{
  const{address,city,state,country,lat,lng,name,description,price}=req.body;
  const user = req.user

  try{

  const newSpot =  await Spot.create({
    address:address,
    ownerId:user.id,
    city:city,
    state:state,
    country:country,
    lat:lat,
    lng:lng,
    name:name,
    description:description,
    price:price
    
  })
  res.statusCode=201
  return res.json(newSpot)



 
}catch(error){
  if (error.name === 'SequelizeValidationError') {
    const validationErrors = {};
    error.errors.forEach(err => {
      validationErrors[err.path] = err.message;
    });
    res.status(400).json({
      message: 'Validation error',
      errors: validationErrors
    });
  }
}
})


//add an image to the spot 
router.post('/spots/:spotId/images', async (req, res) => {
  const {url, preview} = req.body
  const currentSpot = await Spot.findByPk(req.params.spotId)
  if(!currentSpot){
    res.statusCode = 404
    return res.json({message: "Spot couldn't be found"})
  }
    const addImageToSpotImage = await SpotImage.create(
      {
      spotId:currentSpot.id,
      url:url,
      preview:preview
    })
    const imageWithExcludedAttributes = await SpotImage.findByPk(addImageToSpotImage.id, {
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });
  
  res.statusCode = 200
  return res.json(imageWithExcludedAttributes);

  
});




//edit spot 
router.put('/spots/:spotId', async (req, res) => {


  try{
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }

  const{address,city,state,country,lat,lng,name,description,price}=req.body;

  if (address) {
    spot.address = address;
  }
  if (city) {
    spot.city = city;
  }
  if (state) {
    spot.state = state;
  }
  if (country) {
    spot.country = country;
  }
  if (lat) {
    spot.lat = lat;
  }
  if (lng) {
    spot.lng = lng;
  }
  if (name) {
    spot.name = name;
  }
  if (description) {
    spot.description = description;
  }
  if (price) {
    spot.price = price;
  }

  // Save the updated spot
  await spot.save();
  return res.json(spot);
  
}catch(error){
  if (error.name === 'SequelizeValidationError') {
    const validationErrors = {};
    error.errors.forEach(err => {
      validationErrors[err.path] = err.message;
    });
    res.status(400).json({
      message: 'Validation error',
      errors: validationErrors
    });
  }
}
});

router.delete('/spots/:spotId', async (req, res) => {
  const spot= await Spot.findByPk(req.params.spotId);
  if(!spot) {
  res.statusCode =404
  return res.json({message: "Spot couldn't be found"})
  }else{
  await spot.destroy()
  res.statusCode=200
  return res.json({ message: "Successfully deleted"});
  }
});


module.exports = router;