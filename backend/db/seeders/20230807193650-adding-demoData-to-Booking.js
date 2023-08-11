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
        spotId: 3,
        userId: 3,
        startDate: "2023-09-01",
        endDate: "2023-09-10"
      },
      {
        spotId: 5,
        userId: 5,
        startDate: "2023-10-12",
        endDate: "2023-10-18"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2023-07-05",
        endDate: "2023-07-15"
      },
      {
        spotId: 7,
        userId: 7,
        startDate: "2023-08-25",
        endDate: "2023-09-02"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-12-01",
        endDate: "2023-12-10"
      },
      {
        spotId: 9,
        userId: 9,
        startDate: "2023-11-01",
        endDate: "2023-11-07"
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-08-08",
        endDate: "2023-08-15"
      },
      {
        spotId: 11,
        userId: 11,
        startDate: "2023-10-20",
        endDate: "2023-10-30"
      },
      {
        spotId: 12,
        userId: 12,
        startDate: "2023-09-10",
        endDate: "2023-09-20"
      },
      {
        spotId: 13,
        userId: 13,
        startDate: "2023-07-15",
        endDate: "2023-07-25"
      },
      {
        spotId: 14,
        userId: 14,
        startDate: "2023-11-05",
        endDate: "2023-11-15"
      },
      {
        spotId: 15,
        userId: 15,
        startDate: "2023-12-15",
        endDate: "2023-12-25"
      },
      {
        spotId: 16,
        userId: 16,
        startDate: "2023-08-05",
        endDate: "2023-08-12"
      },
      {
        spotId: 17,
        userId: 17,
        startDate: "2023-10-02",
        endDate: "2023-10-08"
      },
      {
        spotId: 18,
        userId: 18,
        startDate: "2023-09-25",
        endDate: "2023-10-05"
      },
      {
        spotId: 19,
        userId: 19,
        startDate: "2023-12-20",
        endDate: "2023-12-30"
      },
      {
        spotId: 20,
        userId: 20,
        startDate: "2023-11-10",
        endDate: "2023-11-18"
      },
      {
        spotId: 21,
        userId: 21,
        startDate: "2023-07-20",
        endDate: "2023-07-28"
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-09-15",
        endDate: "2023-09-25"
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-10-15",
        endDate: "2023-10-25"
      },
      {
        spotId: 24,
        userId: 24,
        startDate: "2023-08-01",
        endDate: "2023-08-08"
      },
      {
        spotId: 25,
        userId: 25,
        startDate: "2023-11-28",
        endDate: "2023-12-05"
      }
    ],{ validate: true }).catch(err => {
   
      // console.log(err)
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
