const express = require('express');
const router = express.Router();
const { SpotImage } = require('../../db/models')
const { Spot } = require('../../db/models')
const { ReviewImage } = require('../../db/models')
//delete image
router.delete('/spot-images/:imageId',async(req,res)=>{
    const {imageId} = req.params
    const deletedSpotImage= await SpotImage.findByPk(imageId);
    if(!deletedSpotImage){
        res.statusCode = 404
        return res.json({message: "Spot Image couldn't be found"})
    }
    deletedSpotImage.destroy();
    return res.json({message: "Successfully deleted"})
})

//delete review image 
router.delete('/review-images/:imageId',async(req,res)=>{
    const {imageId} = req.params
    const deletedReviewImage= await ReviewImage.findByPk(imageId);
    if(!deletedReviewImage){
        res.statusCode = 404
        return res.json({message: "Spot Image couldn't be found"})
    }
    deletedReviewImage.destroy();
    return res.json({message: "Successfully deleted"})
})

module.exports = router;