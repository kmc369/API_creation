const express = require('express');
const router = express.Router();
const { Booking } = require('../../db/models')
const { User } = require('../../db/models')
const {Spot } = require('../../db/models')
const {SpotImage}= require('../../db/models')
//get all the current users bookings
router.get('/bookings/current', async (req, res) => {
const user= req.user;
const Bookings = await Booking.findAll({
    include:
    [{
        model:Spot ,
        attributes:{
            exclude:["createdAt","updatedAt","description"]
        },
        include:[
            {
                model: SpotImage,
                attributes: ['url'],
                where: { preview: true },
                required: false
            }
        ]
    },
  ],
    where:{
        userId:user.id
    }
})
const formattedBookings = Bookings.map(booking => ({
    id: booking.id,
    spotId: booking.spotId,
    Spot: {
        ...booking.Spot.toJSON(),
        previewImage: booking.Spot.SpotImages.length > 0 ? booking.Spot.SpotImages[0].url : null,
        SpotImages: undefined 
    },
    userId: booking.userId,
    startDate: booking.startDate,
    endDate: booking.endDate,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt
}));
    return res.json({Bookings:formattedBookings})
})

//get all bookings for a spot based on spotId
router.get('/spots/:spotId/bookings', async (req, res) => {
    
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        res.statusCode = 404;
        return res.json({message: "Spot couldn't be found"})
    }
    const Bookings = await Booking.findAll({
        include:{
            model:User,
            attributes:{
                exclude:["hashedPassword", "email", "createdAt", "updatedAt","username"]
            }
        },
        where:{
            spotId:spot.id
        }
    })
    return res.json({Bookings})
})

//create a booking from a spot based on spot Id
router.post('/spots/:spotId/bookings', async (req, res) => {

  try{
    const user = req.user
    const {startDate,endDate} = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        res.statusCode=404;
       return res.json({message: "Spot couldn't be found"})
    }
    //conflicting 
    const existingBooking = await Booking.findOne({
        where: {
          spotId: spot.Id,
          startDate: {
            [Op.between]: [startDate, endDate]
          }
        }
      });
  
      if (existingBooking) {
        return res.status(403).json({ message: 'Sorry, this spot is already booked for the specified dates' });
      }

    const newBooking = await Booking.create({
        spotId:spot.id,
        userId:user.id,
        startDate:startDate,
        endDate:endDate
    })
    return res.json(newBooking)
}catch(error){
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          message: 'Bad Request',
          errors: error.errors
        });
      }
  
    }
  
})


//update and return exisiting bookin
router.put('/bookings/:bookingId', async (req, res) => {

const {startDate,endDate} = req.body
const editBooking = await Booking.findByPk(req.params.bookingId);
const user = req.user

    if(!editBooking){
        res.statusCode=400;
        return res.json({message: "Booking couldn't be found"})
    }
     
    if (!editBooking) {
        res.statusCode = 404
        return res.json({ message: "Booking couldn't be found" });
      }
  
      if (editBooking.userId !== user.id) {
        res.statusCode=403
        return res.json({ message: 'Unauthorized to edit this booking' });
      }
  

    if(startDate){
        editBooking.startDate = startDate
    }
    if(endDate){
        editBooking.endDate = endDate
    }
    editBooking.save()
    return res.json(editBooking)
})

//delete a book 
router.delete('/bookings/:bookingId',async(req,res)=>{
  
    const deletedBooking= await Booking.findByPk(req.params.bookingId);
    if(!deletedBooking){
        res.statusCode = 404;
        return res.json({message: "Booking couldn't be found"})
    }
    deletedBooking.destroy();
    return res.json({message: "Successfully deleted"})
})

module.exports = router;