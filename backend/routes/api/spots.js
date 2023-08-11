const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const {User }= require('../../db/models')
const {SpotImage}= require('../../db/models')
const {Review} = require('../../db/models')
// This route handler should be fine as it uses a middleware function








//get All Spots
// router.get('/spots', async (req, res) => {
//   try{
//   const spots = await Spot.findAll();
//   res.statusCode=200
//   return res.json({spots});
//   }catch(error){
//     res.status(500)
//   }
// });

router.get('/spots', async (req, res) => {
  try {
    let { page = 1, size = 20} = req.query;

    // Validate query parameters
   
      page= parseInt(page);
      size= parseInt(size);


     
    if (page < 1 || page > 10) {
      throw new Error('Page must be between 1 and 10');
    }

    if (size < 1 || size > 20) {
      throw new Error('Size must be between 1 and 20');
    }
    // const spots = await Spot.findAll({
    //   include:[
    //     {
    //     model:Review,
    //     attributes:{
    //       exclude:["createdAt","updatedAt","review","spotId","userId","id"]
    //     }, 
    //     },
    //     {
    //       model:SpotImage,
    //       attributes:{
    //         exclude:["createdAt","updatedAt","preview","spotId","id"]
    //       }
    //     },
    //   ],
    //   limit:size,
    //   offset: (page - 1) * size,
    // });
    const spots = await Spot.findAll({
      include: [{ model: Review }, { model: SpotImage }],
    });
    const Spots = [];
    for (let i = 0; i < spots.length; i++) {
      Spots.push(spots[i].toJSON());
    }
    for (let i = 0; i < Spots.length; i++) {
      const spot = Spots[i];
      for (let j = 0; j < spot.SpotImages.length; j++) {
        const image = spot.SpotImages[j];
        if (image.preview === true) {
          spot.previewImage = image.url;
        }
      }
      if (!spot.previewImage) {
        spot.previewImage = "no preview image found";
      }
      delete spot.SpotImages;
      let sumStars = 0;
      let countReviews = 0;
      for (let i = 0; i < spot.Reviews.length; i++) {
        const review = spot.Reviews[i];
        if (review) {
          sumStars += review.stars;
          countReviews++;
        }
      }
      const avgRating = countReviews > 0 ? sumStars / countReviews : 0;
      spot.avgRating = avgRating;
      delete spot.Reviews;
    }
    res.json({Spots});

   
    // spots.forEach(spot => {
    //   let totalStars = 0;
    //   if (spot.Reviews && spot.Reviews.length > 0) {
    //     spot.Reviews.forEach(review => {
    //       totalStars += review.stars;
    //     });
    //     const avgStar = totalStars / spot.Reviews.length;
    //     spot.dataValues.avgRating = avgStar;
    //   } else {
    //     spot.dataValues.avgRating = 0; // No reviews, so average is 0
    //   }
    // });
    


   

  
    
  
    
    // const response = {
    //   Spots: spots,
    //   page: page,
    //   size: size,
     
    // };


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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


  const spot = await Spot.findByPk(req.params.spotId)
  
  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }
  
  const{address,city,state,country,lat,lng,name,description,price}=req.body;
  
  try{
  if (address  && address !== '') {
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