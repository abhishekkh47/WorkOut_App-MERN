const express = require('express');
const cors = require('cors');
const Workout = require('../models/workoutModel');
const {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// enable cross-origin middleware
router.use(cors());
// fire the requireAuth() function before going to any of the routes
// requireAuth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkoutById);

// POST a new workout
router.post('/', createWorkout);

// res.json({ mssg: 'POST a new workout' });

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a new workout
router.patch('/:id', updateWorkout);

module.exports = router;