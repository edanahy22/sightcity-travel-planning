const User = require('./User');
const Trip = require('./Trip');
const ThingsToDo = require('./ThingsToDo');
const Hotel = require('./Hotel');

User.hasMany(Trip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Trip.belongsTo(User, {
  foreignKey: 'user_id'
});

Trip.hasMany(ThingsToDo, {
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

ThingsToDo.belongsTo(Trip, {
  foreignKey: 'trip_id'
});
module.exports = { User, Trip, Hotel, ThingsToDo };
