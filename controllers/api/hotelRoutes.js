const router = require('express').Router();
const { Test } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newHotel = await Test.create({
            ...req.body,
        });

        res.status(200).json(newHotel)
    } catch (err) {
        res.status(400).json(err)
    };
})

router.get('/', async (req, res) => {
    try {
        const hotelData = await Test.findAll;
        const hotels = hotelData.map((hotel) => hotel.get({ plain: true}))

        res.status(200).json(hotels)
    } catch (err) {
        res.status(500).json(err)
    }
})