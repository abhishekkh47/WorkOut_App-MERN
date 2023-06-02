const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// static signup method
// we can not use 'arrow function' here as we are using 'this' keyword inside the function
// so this function needs to be defined as regular function
userSchema.statics.signup = async function(email, password) {
    const exists = await this.findOne({ email});

    if(exists) {
        throw Error('Email already in use');
    }

    // bcrypt adds a 'salt'(random) string to the password and hash it 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash});

    return user;

}

module.exports = mongoose.model('User', userSchema);