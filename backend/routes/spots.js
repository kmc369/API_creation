const express = require('express');
const router = express.Router();
const { Spot } = require('../db/models');
const {User }= require('../db/models')
const {SpotImage}= require('../db/models')

// This route handler should be fine as it uses a middleware function

//get All Spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll();

  res.json(spots);
});


//GetSpotsBy Users

router.get('/current', async(req,res)=>{
 
   const currentUser = req.user
   if(currentUser){
   const userSpots = await currentUser.getSpots();
  res.json(userSpots);
   }else{
   res.json({
    "message": "Spot couldn't be found"
  })
}
})

//get details of spot by its id
router.get('/:spotId', async (req, res) => {
  const {spotId} = req.params
  
  try{
  const spot = await Spot.findByPk(spotId,{
    
    include:[{
      model:SpotImage,
    },
    {
      model:User,
    }]
  
  })

  if(!spot){
    return res.json({message: "Spot couldn't be found"})
  }

  return res.json(spot)
}catch(error){
  console.error('Error:', error);
  return res.status(500).json({ error: 'Internal server error' });
 
  
}
 
});



//create a spot 
router.post('/', async(req,res)=>{
  const{address,city,state,country,lat,lng,name,description,price}=req.body;

  try{

  const newSpot =  await Spot.create({
    address:address,
    city:city,
    state:state,
    country:country,
    lat:lat,
    lng:lng,
    name:name,
    description:description,
    price:price
    
  })
  
  return res.json(newSpot)



 
}catch(error){
  console.error('Error:', error);
  return res.status(500).json({ error: 'Internal server error' });
}
})


//add an image to the spot 
router.post('/:spotId/images', async (req, res) => {
  const {url, preview} = req.body
  const {spotId} = req.params

    const addImageToSpotImage = await SpotImage.create({
      attributes:['id','url','preview'],
      spotId:spotId,
      url:url,
      preview:preview
    })

  
  return res.json(addImageToSpotImage);
});

router.put('/:spotId', async (req, res) => {
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
});


module.exports = router;