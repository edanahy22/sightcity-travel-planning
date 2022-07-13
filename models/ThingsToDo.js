const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ThingsToDo extends Model {}

ThingsToDo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    excursion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excursion_date: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.STRING,
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
    modelName: 'thingstodo',
  }
);

module.exports = ThingsToDo;