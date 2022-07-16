const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const hotelRoutes = require('./hotelRoutes')

router.use('/users', userRoutes);
router.use('/trip', tripRoutes);
router.use('/hotel', hotelRoutes)

module.exports = router;
