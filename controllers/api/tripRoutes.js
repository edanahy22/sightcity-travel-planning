const router = require('express').Router();
const { Trip } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      where: {
        user_id: req.session.user_id
      },
  });

    const trip = tripData.get({ plain: true });

    res.render('project', {
      ...trip,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newTrip = await Trip.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log(newTrip)
    console.log(JSON.stringify(newTrip))

    res.status(200).json(newTrip);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with this id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
