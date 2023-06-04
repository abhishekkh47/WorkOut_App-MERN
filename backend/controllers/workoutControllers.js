const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const user_id = req.user.id;
        const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
};

// get a single workout
const getWorkoutById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ Error: 'No such workout' });
    }
    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            res.status(404).json({ Error: 'No such workout' });
        }
        else {
            res.status(200).json(workout);
        }
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
};

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(404).json({ error: 'Please fill in all the fields', emptyFields })
    }


    // add doc to DB
    try {
        // we will make use of the 'user' property which we added in the middleware 'requireAuth'
        const user_id = req.user._id;
        const workout = await Workout.create({ title, load, reps, user_id });
        res.status(200).json(workout);
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        res.status(400).json({ Error: error.message });
    }
};


// delete a single workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).json({ Error: 'No such workout' });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
            res.status(404).json({ Error: 'No such workout' });
        }
        else {
            res.status(200).json(workout);
        }
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
};

// update a single workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, reps, load } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).json({ Error: 'No such workout' });
    }
    try {
        const workouts = await Workout.findOneAndUpdate({ _id: id }, {
            ...req.body // title: title, reps: reps, load: load
        });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
};

module.exports = { createWorkout, getWorkouts, getWorkoutById, deleteWorkout, updateWorkout }