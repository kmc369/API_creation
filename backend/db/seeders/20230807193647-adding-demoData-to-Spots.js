'use strict';

/** @type {import('sequelize-cli').Migration} */
const {Spot} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {

   await Spot.bulkCreate([
    {
      ownerId:1,
      address:"403 West Palms Street",
      city:"Los Angelos",
      state: 'California',
      country: 'USA',
      lat:20.9745,
      lng:40.3003,
      name:"The Weston",
      description:"Large 5 bedroom house, 3 minute walk from the shore. Amenities include, pool, washer/dryer, and gym. Dog friendly",
      price:200.99
    },
    {
      ownerId: 2,
      address: '123 Main St',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      name: 'Penthouse Apartment',
      description: 'A cozy apartment in the city.',
      price: 150.00
    },
    {
      ownerId: 3,
      address: '123 White House',
      city: 'Washington DC',
      state: 'Washington Dc',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      name: 'Large White House',
      description: 'Comes with great security.',
      price: 150.00
    }
   ],{ validate: true }).catch(err => {

    // console.log(err)
  });

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
