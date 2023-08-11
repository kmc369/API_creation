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
    },
    {
      ownerId: 3,
      address: '777 Sunset Blvd',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      lat: 34.0522,
      lng: -118.2437,
      name: 'Sunset View Villa',
      description: 'Luxurious villa with stunning sunset views.',
      price: 400.00
    },
    {
      ownerId: 3,
      address: '456 Park Avenue',
      city: 'San Francisco',
      state: 'California',
      country: 'USA',
      lat: 37.7749,
      lng: -122.4194,
      name: 'Luxury Heights',
      description: 'High-rise luxury apartment with cityscape.',
      price: 350.50
    },
    {
      ownerId: 1,
      address: '123 Mountain Ridge Rd',
      city: 'Aspen',
      state: 'Colorado',
      country: 'USA',
      lat: 39.1911,
      lng: -106.8175,
      name: 'Ski Chalet',
      description: 'Charming chalet near the ski slopes.',
      price: 280.75
    },
    {
      ownerId: 1,
      address: '789 Ocean Breeze Ln',
      city: 'Miami',
      state: 'Florida',
      country: 'USA',
      lat: 25.7617,
      lng: -80.1918,
      name: 'Oceanfront Retreat',
      description: 'Spacious retreat with direct beach access.',
      price: 420.25
    },
    {
      ownerId: 1,
      address: '555 Riverside Ave',
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA',
      lat: 41.8781,
      lng: -87.6298,
      name: 'Riverfront Penthouse',
      description: 'Elegant penthouse with riverfront views.',
      price: 600.00
    },
    {
      ownerId: 1,
      address: '222 Lakeside Ave',
      city: 'Seattle',
      state: 'Washington',
      country: 'USA',
      lat: 47.6062,
      lng: -122.3321,
      name: 'Lakefront Cabin',
      description: 'Rustic cabin on the shores of a serene lake.',
      price: 220.00
    },
    {
      ownerId: 1,
      address: '123 Pine Forest Rd',
      city: 'Portland',
      state: 'Oregon',
      country: 'USA',
      lat: 45.5051,
      lng: -122.6750,
      name: 'Forest Hideaway',
      description: 'Secluded cabin nestled in a lush forest.',
      price: 180.50
    },
    {
      ownerId: 3,
      address: '987 Skyline Blvd',
      city: 'Denver',
      state: 'Colorado',
      country: 'USA',
      lat: 39.7392,
      lng: -104.9903,
      name: 'Skyline Loft',
      description: 'Contemporary loft with panoramic city views.',
      price: 280.00
    },
    {
      ownerId: 3,
      address: '101 Main St',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      name: 'City Center Apartment',
      description: 'Central apartment in the heart of the city.',
      price: 200.00
    },
    {
      ownerId: 1,
      address: '789 Green Valley Rd',
      city: 'Austin',
      state: 'Texas',
      country: 'USA',
      lat: 30.2672,
      lng: -97.7431,
      name: 'Hillside Retreat',
      description: 'Quiet retreat with views of the Texas hills.',
      price: 150.00
    },
    {
      ownerId: 1,
      address: '456 Lakeshore Dr',
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA',
      lat: 41.8781,
      lng: -87.6298,
      name: 'Lakeview Condo',
      description: 'Modern condo with stunning lakefront views.',
      price: 350.00
    },
    {
      ownerId: 1,
      address: '1234 Vineyard Rd',
      city: 'Napa Valley',
      state: 'California',
      country: 'USA',
      lat: 38.2975,
      lng: -122.2869,
      name: 'Vineyard Cottage',
      description: 'Charming cottage in the heart of wine country.',
      price: 250.00
    },
    {
      ownerId: 3,
      address: '567 Broadway',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      name: 'Broadway Loft',
      description: 'Stylish loft apartment near Broadway theaters.',
      price: 320.00
    },
    {
      ownerId: 3,
      address: '789 Sunset Blvd',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      lat: 34.0522,
      lng: -118.2437,
      name: 'Sunset Oasis',
      description: 'Modern oasis with a rooftop pool and city views.',
      price: 550.00
    },
    {
      ownerId: 3,
      address: '555 Riverfront Ave',
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA',
      lat: 41.8781,
      lng: -87.6298,
      name: 'Riverside Condo',
      description: 'Elegant condo with views of the Chicago River.',
      price: 420.00
    },
    {
      ownerId: 3,
      address: '123 Mountain View Rd',
      city: 'Denver',
      state: 'Colorado',
      country: 'USA',
      lat: 39.7392,
      lng: -104.9903,
      name: 'Mountain Vista Cabin',
      description: 'Cozy cabin with breathtaking mountain views.',
      price: 280.00
    },
    {
      ownerId: 3,
      address: '101 Beachside Ave',
      city: 'Miami',
      state: 'Florida',
      country: 'USA',
      lat: 25.7617,
      lng: -80.1918,
      name: 'Beachfront Paradise',
      description: 'Luxury villa right on the sandy shores.',
      price: 650.00
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
