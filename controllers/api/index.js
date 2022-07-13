const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./tripRoutes');

router.use('/users', userRoutes);
router.use('/trips', projectRoutes);

module.exports = router;
