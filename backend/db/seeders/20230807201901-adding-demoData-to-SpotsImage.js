'use strict';
const { SpotImage } = require('../models');

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await SpotImage.bulkCreate([
      
  {
    spotId: 1,
    url: "https://example.com/image1.jpg",
    preview: true
  },
  {
    spotId: 2,
    url: "https://example.com/image2.jpg",
    preview: false
  }
])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotsImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2] }
    }, {});
  }
};
