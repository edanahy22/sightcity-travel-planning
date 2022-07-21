const router = require('express').Router();
const { Activity, Trip } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newActivity = await Activity.create({
      ...req.body,
      trip_id: req.session.trip_id,
    });

    res.status(200).json(newActivity);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
