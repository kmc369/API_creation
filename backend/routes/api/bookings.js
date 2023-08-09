const express = require('express');
const router = express.Router();
const { Booking } = require('../../db/models')
const { User } = require('../../db/models')
const {Spot } = require('../../db/models')

//get all the current users bookings
router.get('/bookings/current', async (req, res) => {
const user= req.user;
const bookings = await Booking.findAll({
    include:
    [{
        model:Spot 
    },
    {
        model:User
    }],
    where:{
        userId:user.id
    }
})
res.json(bookings)
})

//get all bookings for a spot based on spotId
router.get('/spots/:spotId/bookings', async (req, res) => {
    const {spotId} = req.params
    const bookings = await Booking.findAll({
        include:{
            model:User
        },
        where:{
            spotId:spotId
        }
    })
    res.json({bookings})
})

//create a booking from a spot based on spot Id
router.post('/spots/:spotId/bookings', async (req, res) => {

    const {spotId} = req.params;
    const user = req.user
    const {startDate,endDate} = req.body

    const newBooking = await Booking.create({
        spotId:spotId,
        userId:user.id,
        startDate:startDate,
        endDate:endDate
    })
    res.json(newBooking)
})

//update and return exisiting bookin
router.put('/bookings/:bookingId', async (req, res) => {
const {bookingId} = req.params;
const {startDate,endDate} = req.body
const editBooking = await Booking.findByPk(bookingId);

    if(!editBooking){
        return res.json({message:"no booking available"})
    }
    if(startDate){
        editBooking.startDate = startDate
    }
    if(endDate){
        editBooking.endDate = endDate
    }
    editBooking.save()
    res.json({editBooking})
})

//delete a book 
router.delete('/bookings/:bookingId',async(req,res)=>{
    const {bookingId} = req.params
    const deletedBooking= await Booking.findByPk(bookingId);
    deletedBooking.destroy();
    res.json({message: "Successfully deleted"})
})

module.exports = router;