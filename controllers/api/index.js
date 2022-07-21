const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const hotelRoutes = require('./hotelRoutes');
const activityRoutes = require('./activityRoutes');
const summaryRoutes = require('./summaryRoutes')

router.use('/users', userRoutes);
router.use('/trip', tripRoutes);
router.use('/hotel', hotelRoutes);
router.use('/activity', activityRoutes);
router.use('/summary', summaryRoutes)

module.exports = router;