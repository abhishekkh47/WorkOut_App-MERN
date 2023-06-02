require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// middleware
// mongoose is an ODM(object data modelling). It wraps mongodb with an extra leyer which allows us to use methods to read and write DB documents and also gives us a way to create models and schemas to ensure more strict data structure
app.use(express.json());  // added this so that we can use the request data in the route and add it to DB

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
// app.get('/', (req, res) => {
//     res.json({ mssg: 'welcome to the app' })
// })
app.use('/api/workouts', workoutRoutes);

// mongoose is an ODM(object data modelling). It wraps mongodb with an extra leyer which allows us to use methods to read and write DB documents and also gives us a way to create models and schemas to ensure more strict data structure
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to DB & listening on port ${process.env.PORT}!!`);
        });
    })
    .catch((error) => {
        console.log(error);
    })

// listen for requests
// app.listen(process.env.PORT, () => {
//     console.log(`listening on port ${process.env.PORT}!!`);
// });