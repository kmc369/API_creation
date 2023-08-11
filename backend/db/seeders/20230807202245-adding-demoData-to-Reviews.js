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
    userId: 4,
    review: "Our stay at The Weston was memorable. The room was clean and comfortable, and the nearby attractions were a bonus.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 5,
    review: "Had a wonderful time at The Weston. The facilities were top-notch, and the food was delicious.",
    stars: 4
  },
  {
    spotId: 2,
    userId: 6,
    review: "The Weston provided a relaxing getaway. The spa services were rejuvenating, and the staff was attentive.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 7,
    review: "Enjoyed every moment at The Weston. The room had a stunning view, and the beach was just steps away.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 8,
    review: "The Weston is a gem! The accommodations were luxurious, and the on-site activities kept us entertained.",
    stars: 5
  },
  {
    spotId: 2,
    userId: 9,
    review: "Had a fantastic time at The Weston. The staff made us feel welcome, and the nearby hiking trails were a highlight.",
    stars: 4
  },
  {
    spotId: 3,
    userId: 10,
    review: "The Weston was the perfect choice for our vacation. The room was spacious, and the oceanfront location was stunning.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 11,
    review: "The Weston exceeded all expectations. The pool area was fantastic, and the dining options were diverse.",
    stars: 5
  },
  {
    spotId: 2,
    userId: 12,
    review: "Had a great time at The Weston. The room was cozy, and the staff went above and beyond to make us comfortable.",
    stars: 4
  },
  {
    spotId: 3,
    userId: 13,
    review: "The Weston provided a memorable experience. The sunrise views were incredible, and the beach was pristine.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 14,
    review: "Enjoyed every moment at The Weston. The amenities were impressive, and the location was ideal for relaxation.",
    stars: 5
  },
  {
    spotId: 2,
    userId: 15,
    review: "The Weston is a must-visit. The room was elegant, and the hotel's attention to detail was evident throughout.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 16,
    review: "Had an amazing time at The Weston. The coastal views were stunning, and the service was impeccable.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 17,
    review: "The Weston was a fantastic choice. The facilities were modern, and the nearby restaurants were delightful.",
    stars: 4
  },
  {
    spotId: 2,
    userId: 18,
    review: "The Weston provided a perfect retreat. The room had a balcony with a view, and the ambiance was serene.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 19,
    review: "Enjoyed every moment at The Weston. The room was comfortable, and the beachfront access was unbeatable.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 20,
    review: "Had a wonderful stay at The Weston. The amenities catered to all ages, and the staff was friendly.",
    stars: 4
  },
  {
    spotId: 2,
    userId: 21,
    review: "The Weston provided an excellent getaway. The room was spacious and well-appointed, and the views were picturesque.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 22,
    review: "The Weston made our vacation special. The room had a luxurious feel, and the sound of the waves was soothing.",
    stars: 5
  },
  {
    spotId: 1,
    userId: 23,
    review: "Had a fantastic time at The Weston. The pool area was relaxing, and the onsite restaurant served delicious meals.",
    stars: 4
  },
  {
    spotId: 2,
    userId: 24,
    review: "The Weston was a delightful escape. The room had all the comforts we needed, and the staff was attentive.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 25,
    review: "The Weston provided an unforgettable experience. The sunsets were breathtaking, and the atmosphere was serene.",
    stars: 5
  }
    
  
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
