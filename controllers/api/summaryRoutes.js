const router = require('express').Router();
const { User, Trip, Hotel, Activity } = require('../../models');
const withAuth = require('../../utils/auth');

//get a single trip (from trip_id)
router.get('/', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.session.trip_id, {
      include: [
        { model: Hotel },
        { model: Activity }
      ],
      // order: [['start_date','ASC']],
    });
    console.log(tripData);

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    const trip = tripData.get({ plain: true });

    res.json({user, trip});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
