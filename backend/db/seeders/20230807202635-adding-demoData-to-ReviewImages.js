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
        url: "https://example.com/review_image1.jpg"
      },
      {
        reviewId: 2,
        url: "https://example.com/review_image2.jpg"
      },
      {
        reviewId: 3,
        url: "https://example.com/review_image2.jpg"
      },
      {
        reviewId: 4,
        "url": "https://example.com/review_image4.jpg"
      },
      {
        reviewId: 5,
        "url": "https://example.com/review_image5.jpg"
      },
      {
        reviewId: 6,
        "url": "https://example.com/review_image6.jpg"
      },
      {
        reviewId: 7,
        "url": "https://example.com/review_image7.jpg"
      },
      {
        reviewId: 8,
        "url": "https://example.com/review_image8.jpg"
      },
      {
        reviewId: 9,
        "url": "https://example.com/review_image9.jpg"
      },
      {
        reviewId: 10,
        "url": "https://example.com/review_image10.jpg"
      },
      {
        reviewId: 11,
        "url": "https://example.com/review_image11.jpg"
      },
      {
        reviewId: 12,
        "url": "https://example.com/review_image12.jpg"
      },
      {
        reviewId: 13,
        "url": "https://example.com/review_image13.jpg"
      },
      {
        reviewId: 14,
        "url": "https://example.com/review_image14.jpg"
      },
      {
        reviewId: 15,
        "url": "https://example.com/review_image15.jpg"
      },
      {
        reviewId: 16,
        "url": "https://example.com/review_image16.jpg"
      },
      {
        reviewId: 17,
        "url": "https://example.com/review_image17.jpg"
      },
      {
        reviewId: 18,
        "url": "https://example.com/review_image18.jpg"
      },
      {
        reviewId: 19,
        "url": "https://example.com/review_image19.jpg"
      },
      {
        reviewId: 20,
        "url": "https://example.com/review_image20.jpg"
      },
      {
        reviewId: 21,
        "url": "https://example.com/review_image21.jpg"
      },
      {
        reviewId: 22,
        "url": "https://example.com/review_image22.jpg"
      },
      {
        reviewId: 23,
        "url": "https://example.com/review_image23.jpg"
      },
      {
        reviewId: 24,
        "url": "https://example.com/review_image24.jpg"
      },
      {
        reviewId: 25,
        "url": "https://example.com/review_image25.jpg"
      }
     
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
