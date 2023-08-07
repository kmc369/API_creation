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
    url:"https://a0.muscache.com/im/pictures/b744fa93-dfab-4b1e-b453-780a07c30ddc.jpg?im_w=720",
    preview: true
  },
  {
    spotId: 2,
    url: "https://galeriemagazine.com/wp-content/uploads/2019/01/Dining_3-1920x1200.jpg",
    preview: false
  },
  {
    spotId:3,
    url:"https://www.travelandleisure.com/thmb/mKI9Ok0tM6x-OTzE_oWeDpRw_18=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/oval-office-white-house-WHITEHOUSE0320-03c73abdc2ab40f0b4d28c8cbcf50e81.jpg",
    preview:true
  }
],{ validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
