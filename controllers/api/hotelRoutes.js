const router = require('express').Router();
const { Hotel, Trip } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newHotel = await Hotel.create({
            ...req.body,
            trip_id: req.session.trip_id,
        });

        res.status(200).json(newHotel)
    } catch (err) {
        res.status(400).json(err)
    };
})

module.exports = router;