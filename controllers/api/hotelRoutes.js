const router = require('express').Router();
const { Hotel } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newHotel = await Hotel.create({
            ...req.body,
        });

        res.status(200).json(newHotel)
    } catch (err) {
        res.status(400).json(err)
    };
})

// router.get('/', async (req, res) => {
//     try {
//         const hotelData = await Hotel.findAll;
//         const hotels = hotelData.map((hotel) => hotel.get({ plain: true}))

//         res.status(200).json(hotels)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router;