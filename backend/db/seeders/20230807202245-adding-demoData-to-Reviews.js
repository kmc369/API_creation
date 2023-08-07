'use strict';

/** @type {import('sequelize-cli').Migration} */
const {Review} = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
await Review.bulkCreate([
  
    {
      spotId: 1,
      userId: 2,
      review: "Had an amazing time at The Weston! The amenities were fantastic, and the location was perfect for our vacation.",
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: "The Cozy Apartment was a lovely place to stay. Clean, comfortable, and conveniently located.",
      stars: 4
    }
  
], { validate: true }).catch(err => {
 
  console.log(err)
});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2] }
    }, {});
  }
};
