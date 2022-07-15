const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hotel extends Model {}

Hotel.init(
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
      allowNull: false,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trip',
        key: 'id',
      },
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

module.exports = Hotel;