const router = require('express').Router();
const { Trip, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // // Get all trips and JOIN with user data
    // const tripData = await Trip.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['first_name'],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const trips = tripData.map((trip) => trip.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('landingpage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/trips', withAuth, async (req, res) => {
//   try {
//     const tripData = await Trip.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['first_name'],
//         },
//       ],
//     });

//     const trip = tripData.get({ plain: true });

//     res.render('trip', {
//       ...trip,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/trip', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      where: {
        user_id: req.session.user_id
      },
  });

    const trips = tripData.map((trip) => trip.get({ plain: true}));

    res.render('alltrips', {
      trips,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/trip/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['first_name']
        }
      ]
    });

    const trip = tripData.get({ plain: true });

    res.render('trip', {
      ...trip,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newtrip', withAuth, async (req, res) => {
  try {
    res.status(200).render('newtrip', {
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/activity', withAuth, async (req, res) => {
  try {
    res.status(200).render('activity', {
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Trip }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     // Get all trips and JOIN with user data
//     const tripData = await Trip.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['first_name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const trips = tripData.map((trip) => trip.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('landingpage');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('profile');
    return;
  }

  res.render('login');
});

module.exports = router;
