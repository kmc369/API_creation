const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const {User }= require('../../db/models')
const {SpotImage}= require('../../db/models')
const {Review} = require('../../db/models')
// This route handler should be fine as it uses a middleware function


router.get('/spots', async (req, res) => {
  try {
    let { page =1, size=20 } = req.query;

    // Validate query parametersß
   
      page= parseInt(page);
      size= parseInt(size);
     

     
    if (page < 1 || page > 10) {
   
      res.statusCode=401
      res.message = "Page must be between 1 and 10"
     throw new Error('Page must be between 1 and 10');
     
    }

    if (size < 1 || size > 20) {
      res.statusCode=401
      res.message = "Size must be between 1 and 20"
      throw new Error('Size must be between 1 and 20');
    }
 
    const spots = await Spot.findAll({
      include: [{ model: Review }, { model: SpotImage }],
      limit: size,
      offset: (page-1)*size
     
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
      let avgRating = 0.0;
    
      if (countReviews > 0) {
        avgRating = (sumStars / countReviews).toFixed(1);
      }
      spot.avgRating = avgRating;
      delete spot.Reviews;
    
     
    }
    
    const response = {
      Spots: Spots,
      page: page,
      size: size,
     
    };

    return res.json(response);
  } catch (error) {
    console.error(error);
    res.status(res.statusCode).json({ message: res.message});
  }
});


//GetSpotsBy Users
router.get('/spots/current', async(req,res)=>{
 
   const currentUser = req.user

   const spots = await Spot.findAll({
    include: [{ model: Review }, 
      { model: SpotImage }],
      where:{
        ownerId:currentUser.id
      }
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
    let avgRating = 0;
    
    if (countReviews > 0) {
      avgRating = Math.round(sumStars / countReviews*100)/100;
    }
    spot.avgRating = avgRating;
    delete spot.Reviews;
  }
  res.json({Spots});


})

//get details of spot by its id
router.get('/spots/:spotId', async (req, res) => {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          attributes: {
            exclude: ["createdAt", "updatedAt", "spotId"]
          }
        },
        {
          model: User,
          attributes: {
            exclude: ["username", "hashedPassword", "email", "createdAt", "updatedAt"]
          }
        },
        {
          model: Review, // Assuming your Review model name is "Review"
          attributes: ["stars"] // Include other review attributes if needed
        },
        
      ]
    });

    if (!spot) {
      res.statusCode = 404;
      return res.json({ message: "Spot couldn't be found" });
    }

    // Calculate average star rating and number of reviews
    let totalStarRating = 0;
    let numReviews = 0;

    if (spot.Reviews && spot.Reviews.length > 0) {
      numReviews = spot.Reviews.length;
      totalStarRating = spot.Reviews.reduce((sum, review) => sum + review.stars, 0);
    }

    // const avgStarRating = numReviews > 0 ? totalStarRating / numReviews : 0;
    let avgStarRating;
    if (numReviews > 0) {
      avgStarRating = (totalStarRating / numReviews).toFixed(1);;
    } else {
        avgStarRating = 0;
    }
    

    const spotDetails = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city:spot.city,
      state:spot.state,
      country:spot.country,
      lat:spot.lat,
      lng:spot.lng,
      name:spot.name,
      description:spot.description,
      price:spot.price,
      createdAt:spot.createdAt,
      updatedAt:spot.updatedAt,
      numReviews: numReviews,
      avgStarRating: avgStarRating,
      SpotImages: spot.SpotImages,
      Owner: spot.User
    };

    return res.json(spotDetails);
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
    ownerId:user.id,
    address:address,
    city:city,
    state:state,
    country:country,
    lat:lat,
    lng:lng,
    name:name,
    description:description,
    price:price,
    
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
      attributes: { exclude: ["spotId", "createdAt", "updatedAt"] },
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