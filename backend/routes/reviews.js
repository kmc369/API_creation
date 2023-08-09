const express = require('express');
const router = express.Router();
const { Review} = require('../db/models')
const { Spot } = require('../db/models')
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

    return res.json(newImage)
  });


  //edit a review
  router.put('/reviews/:reviewId', async (req, res) => {

    const {reviewId} = req.params
    const {review, stars} = req.body

    const updatedreview = await Review.findByPk(reviewId);
    if(!updatedreview){
        return res.json({message:"review not found"})
    }

    if(review){
        updatedreview.review = review;
    }
    if(stars){
        updatedreview.stars = stars;
    }

    await updatedreview.save();

    res.json(updatedreview)
  })

  //delete a review 
  router.delete('/reviews/:reviewId', async (req, res) => {
    const {reviewId} = req.params
    const deletedReview = await Review.findByPk(reviewId);
    deletedReview.destroy();
    res.json({message: "Successfully deleted"})
  })  

module.exports = router;