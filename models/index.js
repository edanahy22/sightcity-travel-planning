const User = require('./User');
const Trip = require('./Trip');
const Activity = require('./Activity');
const Hotel = require('./Hotel');

User.hasMany(Trip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Trip.belongsTo(User, {
  foreignKey: 'user_id'
});

Trip.hasMany(Activity, {
  foreignKey: 'trip_id',
  onDelete: 'CASCADE',
});

Trip.hasOne(Hotel, {
  foreignKey: 'trip_id',
  onDelete: 'CASCADE',
});

Hotel.belongsTo(Trip, {
  foreignKey: 'trip_id'
})

Activity.belongsTo(Trip, {
  foreignKey: 'trip_id'
});

module.exports = { User, Trip, Hotel, Activity };