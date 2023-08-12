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
        url: "https://www.example.com/image1.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.example.com/image2.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.example.com/image3.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.example.com/image4.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.example.com/image5.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.example.com/image6.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.example.com/image7.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.example.com/image8.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.example.com/image9.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.example.com/image10.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.example.com/image11.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.example.com/image12.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://www.example.com/image13.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.example.com/image14.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.example.com/image15.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.example.com/image16.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.example.com/image17.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.example.com/image18.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.example.com/image19.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.example.com/image20.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.example.com/image21.jpg",
        preview: false
      },
     
],{ validate: true }).catch(error=>{
  // console.log(error)
})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
