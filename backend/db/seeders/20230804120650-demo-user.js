'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName:'John',
        lastName:'Doe',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      // {
      //   firstName:'Jane',
      //   lastName:'Doe',
      //   email: 'Jane@user.io',
      //   username: 'FakeUser1',
      //   hashedPassword: bcrypt.hashSync('password2')
      // },
      // {
      //   firstName:'Olivia',
      //   lastName:'Pope',
      //   email: 'OPope@user.io',
      //   username: 'FitzLover123',
      //   hashedPassword: bcrypt.hashSync('password3')
      // }
    ], { validate: true }).catch(err => {
   
      // console.log(err)
    });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FitzLover123'] }
    }, {});
  }
};