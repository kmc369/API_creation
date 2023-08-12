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
    spotId: 2,
    userId: 3,
    review: "The Weston exceeded my expectations. The staff was friendly, and the views from the room were breathtaking!",
    stars: 4
  },
  {
    spotId: 3,
    userId: 3,
    review: "Our stay at The Weston was memorable. The room was clean and comfortable, and the nearby attractions were a bonus.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 1,
    review: "Had a wonderful time at The Weston. The facilities were top-notch, and the food was delicious.",
    stars: 4
  },
  {
    spotId: 2,
    userId: 1,
    review: "The Weston provided a relaxing getaway. The spa services were rejuvenating, and the staff was attentive.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 2,
    review: "Enjoyed every moment at The Weston. The room had a stunning view, and the beach was just steps away.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 2,
    review: "The Weston is a gem! The accommodations were luxurious, and the on-site activities kept us entertained.",
    stars: 5
  },
  {
    spotId: 2,
    userId: 2,
    review: "Had a fantastic time at The Weston. The staff made us feel welcome, and the nearby hiking trails were a highlight.",
    stars: 4
  },
  {
    spotId: 3,
    userId: 3,
    review: "The Weston was the perfect choice for our vacation. The room was spacious, and the oceanfront location was stunning.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 3,
    review: "The Weston exceeded all expectations. The pool area was fantastic, and the dining options were diverse.",
    stars: 5
  },
  


    
  
], { validate: true }).catch(err => {
 
  // console.log(err)
});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
