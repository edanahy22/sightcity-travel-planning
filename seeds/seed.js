const sequelize = require('../config/connection');
const { User, Trip, Hotel, ThingsToDo } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const hotelData = require('./hotel.json')
const thingsData = require('./thingsToDo.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const trip of tripData) {
    await Trip.create({
      ...trip,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
