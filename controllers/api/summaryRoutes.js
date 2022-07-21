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

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    
    const trip = tripData.get({ plain: true });
    let start_date = new Date(trip.start_date)
    trip.start_date = start_date
    let end_date = new Date(trip.end_date)
    trip.end_date = end_date
    for (let i = 0; i < trip.activities.length; i++) {
      let activity_date = new Date(trip.activities[i].activity_date).toDateString()
      trip.activities[i].activity_date = activity_date
    }

    res.json({user, trip});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;