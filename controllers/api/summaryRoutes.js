const router = require('express').Router();
const { User, Trip, Hotel } = require('../../models');
const withAuth = require('../../utils/auth');

//get a single trip (from trip_id)
router.get('/summary', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.session.trip_id, {
      include: [{ model: Hotel, Activity }],
      // order: [['start_date','ASC']],
    });
    console.log(tripData);

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    const trip = tripData.get({ plain: true });

    res.render('summary', {
      user,
      trip,
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found!' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get hotel from trip
// router.get('/:id', async (req, res) => {
//     try{
//        const tripData= await Hotel.findAll(req.params.id, {
//            include: [{ model: Trip, Hotel }]
//        });

//        if (!tripData) {
//         res.status(404).json({ message: 'No trip found!' });
//         return;
//       }
//       res.status(200).json(tripData);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })

module.exports = router;
