const sequelize = require('../config/connection');
const { User, Trip, Hotel, Activity } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const hotelData = require('./hotel.json')
const thingsData = require('./activity.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Hotel.bulkCreate(hotelData);
 await Activity.bulkCreate(thingsData);

  for (const trip of tripData) {
    await Trip.create({
      ...trip, 
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  

  process.exit(0);
};

seedDatabase();
