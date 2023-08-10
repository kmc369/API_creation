const express = require('express');
const router = express.Router();
const { Booking } = require('../../db/models')
const { User } = require('../../db/models')
const {Spot } = require('../../db/models')

//get all the current users bookings
router.get('/bookings/current', async (req, res) => {
const user= req.user;
const Bookings = await Booking.findAll({
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
    return res.json({Bookings})
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
            model:User
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
  
    //   if (editBooking.endDate > new Date()) {
    //     console.log(new Date())
    //     console.log(editBooking.endDate)
    //     return res.status(403).json({ message: "Past bookings can't be modified" });
    //   }
        // Check for conflicting bookings
    // const conflictingBooking = await Booking.findOne({
    //     where: {
    //       spotId: editBooking.spotId,
    //       [Sequelize.Op.and]: [
    //         {
    //           id: {
    //             [Sequelize.Op.ne]: req.params.bookingId,
    //           },
    //         },
    //         {
    //           [Sequelize.Op.or]: [
    //             {
    //               startDate: {
    //                 [Sequelize.Op.between]: [startDate, endDate],
    //               },
    //             },
    //             {
    //               endDate: {
    //                 [Sequelize.Op.between]: [startDate, endDate],
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   });
  
    //   if (conflictingBooking) {
        
    //     return res.status(403).json({
    //       message: 'Sorry, this spot is already booked for the specified dates',
    //       errors: {
    //         startDate: 'Start date conflicts with an existing booking',
    //         endDate: 'End date conflicts with an existing booking',
    //       },
    //     });
    //   }
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