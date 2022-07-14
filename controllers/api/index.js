const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./tripRoutes');
const hotelRoutes = require('./hotelRoutes')

router.use('/users', userRoutes);
router.use('/trips', projectRoutes);
// router.use('/hotels', hotelRoutes);

module.exports = router;
