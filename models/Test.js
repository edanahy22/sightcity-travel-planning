const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Test extends Model {}

Test.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hotel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hotel_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hotel_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hotel_price: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'hotel',
  }
);

module.exports = Test;