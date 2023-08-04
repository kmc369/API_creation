'use strict';
const { Model, Validator } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking,{
        foreignKey:'userId',
        onDelete:"CASCADE"
      })
      User.hasMany(models.Spot,{
        foreignKey:'ownerId',
        onDelete:"CASCADE"
      })

      User.hasMany(models.Review,{
        foreignKey:'userId',
        onDelete:"CASCADE"
      })
    
    }
  }
  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,30]
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,30]
      }
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        len:[4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    hashedPassword: {
      type:DataTypes.STRING.BINARY,
      allowNull:false,
      validate: {
        len: [60, 60]
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true,
        len:[3,256]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};