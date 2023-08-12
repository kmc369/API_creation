'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-08-15",
        endDate: "2023-08-20"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-11-15",
        endDate: "2023-11-25"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-11-15",
        endDate: "2023-11-25"
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-09-01",
        endDate: "2023-09-10"
      },
      {
        spotId: 5,
        userId: 3,
        startDate: "2023-10-12",
        endDate: "2023-10-18"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2023-07-05",
        endDate: "2023-07-15"
      },
      
    
    ],{ validate: true }).catch(err => {
   
      console.log(err)
    });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2,3] }
    }, {});
  
  }
};
