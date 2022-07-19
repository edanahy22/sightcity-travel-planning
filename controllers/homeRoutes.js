const router = require('express').Router();
const {Sequelize, Op} = require('sequelize');
const { Trip, User, Hotel, Activity} = require('../models');
const withAuth = require('../utils/auth');
const unSqlDate = require('../utils/helpers')

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

// router.get('/trip', withAuth, async (req, res) => {
//   try {
//     const tripData = await Trip.findAll({
//       where: {
//         user_id: req.session.user_id
//       },
//   });

//     const trips = tripData.map((trip) => trip.get({ plain: true}));

//     res.render('alltrips', {
//       trips,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/trip/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: Hotel,
        },
        {
          model: User,
          attributes: ['first_name']
        }
      ]
    });
    const trip = tripData.get({ plain: true });
    const activityData = await Activity.findAll({
      where: {
        trip_id: {
          [Op.eq]: `${req.params.id}`
        }
      }
    })
    const activities = activityData.map((activity) => activity.get({ plain: true }))
    res.render('trip', {
      ...trip,
      activities,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/socialtrip/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name']
        },
        {
          model: Hotel,
        }
      ]
    });

    const activityData = await Activity.findAll({
      where: {
        trip_id: {
          [Op.eq]: `${req.params.id}`
        }
      }
    })

    const activities = activityData.map((activity) => activity.get({ plain: true }))
    //format date into more readable text
    for (let i=0; i<activities.length; i++) {
      activities[i].activity_date = unSqlDate(activities[i].activity_date)
    }
    const trip = tripData.get({ plain: true });
    trip.start_date = unSqlDate(trip.start_date)
    trip.end_date = unSqlDate(trip.end_date)

    res.render('socialtrip', {
      ...trip,
      activities,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/newtrip', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      where: {
        user_id: {
          [Op.ne]: `${req.session.user_id}`
        }
      },
      include : [{
        model: User,
        attributes: ['first_name', 'last_name']
      }],
    })
    const trips = tripData.map((trip) => trip.get({ plain: true }));
    console.log(trips)
    res.status(200).render('newtrip', {
      trips,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Not sure if we need this code now that activities is not on a separate page

// router.get('/activity', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//     });
//     const tripData = await Trip.findByPk(req.session.trip_id)
//     res.status(200).render('activity', {
//       logged_in: req.session.logged_in,
//       ...userData.get(),
//       ...tripData.get()
//     })
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Trip }],
    });
    const user = userData.get({ plain: true });
    //renders the dates from sql into more human readable format
    for (let i=0; i<user.trips.length; i++){
      user.trips[i].start_date = unSqlDate(user.trips[i].start_date)
      user.trips[i].end_date = unSqlDate(user.trips[i].end_date)
    };
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Trip }],
    });

    const user = userData.get({ plain: true });

    res.render('about', {
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

router.get('/summary', withAuth, async (req, res) => {
  try{
     const tripData= await Trip.findByPk(req.session.trip_id, {
         include: [{ model: Hotel }]
     });

     const activityData = await Activity.findAll({
      where: {
        trip_id: {
          [Op.eq]: `${req.session.trip_id}`
        }
      }
    })

    const userData = await User.findByPk(req.session.user_id);

    const activities = activityData.map((activity) => activity.get({ plain: true }))
    const user= userData.get({ plain: true});
    const trip = tripData.get({ plain: true });
    console.log(trip);
    console.log(activities);
     
     
     res.render('summary', {
      user, trip, activities, logged_in: req.session.logged_in
     })

  }
  catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;
