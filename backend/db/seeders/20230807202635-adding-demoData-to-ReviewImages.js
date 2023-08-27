'use strict';
const{ReviewImage} = require('../models')
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
  await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "https://i.pinimg.com/736x/88/bc/e6/88bce6d9f31b39af0d0cd1e5b47e74ad.jpg"
      },
      {
        reviewId: 2,
        url: "https://i.pinimg.com/736x/88/bc/e6/88bce6d9f31b39af0d0cd1e5b47e74ad.jpg"
      },
      // {
      //   reviewId: 1,
      //   url: "https://example.com/review_image2.jpg"
      // },
      // {
      //   reviewId: 2,
      //   "url": "https://example.com/review_image4.jpg"
      // },
      // {
      //   reviewId: 1,
      //   "url": "https://example.com/review_image5.jpg"
      // },

     
  ], { validate: true }).catch(err => {

    // console.log(err)
  });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
