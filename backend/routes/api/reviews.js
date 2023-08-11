const express = require('express');
const router = express.Router();
const { Review} = require('../../db/models')
const { Spot } = require('../../db/models')
const { ReviewImage }= require('../../db/models')
const { User } = require('../../db/models')
const {SpotImage}= require('../../db/models')
//get reviews by user
router.get('/reviews/current', async (req, res) => {
  const user = req.user;

  const Reviews = await Review.findAll({
      include: [
          {
              model: User,
              attributes: {
                  exclude: ["username", "hashedPassword", "email", "createdAt", "updatedAt"]
              }
          },
          {
              model: Spot,
              attributes: {
                  exclude: ["createdAt", "updatedAt","description"]
              },
              include: [
                  {
                      model: SpotImage,
                      attributes: ['url'],
                      where: { preview: true },
                      required: false
                  }
              ]
          },
          {
              model: ReviewImage,
              attributes: ['id', 'url']
          }
      ],
      where: {
          userId: user.id
      }
  })

  const newReviews = Reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: review.User,
      Spot: {
          ...review.Spot.toJSON(),
          previewImage: review.Spot.SpotImages.length > 0 ? review.Spot.SpotImages[0].url : null,
          SpotImages: undefined 
      },
      ReviewImages: review.ReviewImages
  }));

  res.statusCode = 200;
  return res.json({ Reviews: newReviews });
})

 // get reviews by spot id
  router.get('/spots/:spotId/reviews', async (req, res) => {
   
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.statusCode = 404
       return res.json({message: "Spot couldn't be found"})
    }
    const Reviews = await Review.findAll({
        include:[
        {
            model:User,
            attributes: {
              exclude: ["username", "hashedPassword", "email", "createdAt", "updatedAt"]
          }
        },
        {
        model:ReviewImage
        }],

        where:{
            spotId:spot.id
        }
    })


 
    res.statusCode=200
    return res.json({Reviews});
  });

  //create a review for a spot based on the Spot id
  router.post('/spots/:spotId/reviews', async (req, res) => {

    try{
 
   const user = req.user
   const {review,stars} = req.body
   const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
  return res.status(404).json({ message: "Spot couldn't be found" });
}

   
   const newReview = await Review.create({
    spotId:spot.id,
    userId:user.id,
    review:review,
    stars:stars
   })
   res.statusCode = 201
   return res.json(newReview)
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
          } else {
            // Handle other errors
            res.status(500).json({
              message: 'An error occurred'
            });
        }

    }
  });


  //add image to a review based on review Id
  router.post('/reviews/:reviewId/images', async (req, res) => {
 
    const review = await Review.findByPk(req.params.reviewId)
    if(!review){
        res.statusCode=404
        return res.json({message: "Review couldn't be found"})
    }
    const{url} = req.body
    const newImage = await ReviewImage.create({
    
      reviewId:review.id,
      url:url,
    })

    const filteredImage = {
      id: newImage.id,
      url: newImage.url
  };

    const imageCount = await ReviewImage.count({
        where: { reviewId: review.id }
      });

    const maxImageCount = 10;

    if (imageCount > maxImageCount) {
      return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
    }
    return res.json(filteredImage)
  });


  //edit a review
  router.put('/reviews/:reviewId', async (req, res) => {

    const {reviewId} = req.params
    const {review, stars} = req.body

    const updatedreview = await Review.findByPk(reviewId);
    if(!updatedreview){
        res.statusCode=404
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
    if(!deletedReview){
        res.statusCode=404
        return res.json({message: "Review couldn't be found"})
    }
    deletedReview.destroy();
    return res.json({message: "Successfully deleted"})
  })  

module.exports = router;