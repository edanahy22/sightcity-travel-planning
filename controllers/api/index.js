const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const hotelRoutes = require('./hotelRoutes');
const activityRoutes = require('./activityRoutes');
const emailRoutes = require('./emailRoutes')

router.use('/users', userRoutes);
router.use('/trip', tripRoutes);
router.use('/hotel', hotelRoutes);
router.use('/activity', activityRoutes);
router.use('/email', emailRoutes)

module.exports = router;
