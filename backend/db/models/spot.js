'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User,{
        foreignKey:'ownerId'
      })

      Spot.hasMany(models.Booking,{
        foreignKey:'spotId',
        onDelete:"CASCADE"
      })

      Spot.hasMany(models.Review,{
        foreignKey:'spotId',
        onDelete:"CASCADE"
      })
      Spot.hasMany(models.SpotImage,{
        foreignKey:'spotId',
        onDelete:"CASCADE"
      })
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
    
      validate:{
        len:[3,90],
        notEmpty: {
          args: true,
          msg: 'Address cannot be empty'

        },
       
        
      }
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,90],
        notEmpty:true,
    
      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,90],
        
      }
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,90]
      }
    },
    lat: {
      type:DataTypes.DECIMAL,
      
    },
    lng: {
      type:DataTypes.DECIMAL,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price:{
      type:DataTypes.DECIMAL
    },
    
  }, {
    sequelize,
    modelName: 'Spot',
    
  });
  return Spot;
};