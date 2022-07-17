const sequelize = require('../config/connection');
const { User, Trip, Hotel, Activity } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const hotelData = require('./hotelData.json')
const activityData = require('./activityData.json')

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
  };

  for (const hotel of hotelData) {
    await Hotel.create({
      ...hotel,
      trip_id: tripData[hotelData.indexOf(hotel)].id,
    });
  };

  for (const activity of activityData) {
    await Activity.create({
      ...activity,
      trip_id: tripData[Math.floor(Math.random() * tripData.length)].id
    });
  };

  process.exit(0);
};

seedDatabase();
