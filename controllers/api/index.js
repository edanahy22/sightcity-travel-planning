const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const hotelRoutes = require('./hotelRoutes');
const activityRoutes = require('./activityRoutes');

router.use('/users', userRoutes);
router.use('/trip', tripRoutes);
router.use('/hotel', hotelRoutes);
router.use('/activities', activityRoutes);

module.exports = router;
