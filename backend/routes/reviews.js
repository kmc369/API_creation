const express = require('express');
const router = express.Router();
const { Review} = require('../db/models')
const {Spot } = require('../db/models')
const { ReviewImage }= require('../db/models')
const { User } = require('../db/models')

//get reviews by user
router.get('/reviews/current', async (req, res) => {
    const user = req.user;

     const reviews = await Review.findAll({
      
        include:[
        {
            model:User,
        },
        {
            model:Spot,
        },
        {
            model:ReviewImage
        }],
   
     })
 
  
    res.json(reviews);
  });


 // get reviews by spot id
  router.get('/spots/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId

    const reviews = await Review.findAll({
        include:[
        {
            model:User
        },
        {
        model:ReviewImage
        }],

        where:{
            spotId:spotId
        }
    })


 
  
    return res.json(reviews);
  });

  //create a review for a spot based on the Spot id
  router.post('/spots/:spotId/reviews', async (req, res) => {
   const spotId = req.params.spotId
   const user = req.user
   const {review,stars} = req.body
   const newReview = await Review.create({
    spotId:spotId,
    userId:user.id,
    review:review,
    stars:stars
    

   })

   return res.json(newReview)
 
  
  });


  //add image to a review based on review Id
  router.post('/reviews/:reviewId/images', async (req, res) => {
    const {reviewId} = req.params
    const{url} = req.body
    const newImage = await ReviewImage.create({
        reviewId:reviewId,
        url:url
    })

    res.json(newImage)
  });

module.exports = router;