const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
userSchema.statics.signup = async function (email, password) {
    // vaidation
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already in use');
    }

    // bcrypt adds a 'salt'(random) string to the password and hash it 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 'this.create' == 'User.create', here 'User' is the schema which we have created
    const user = await this.create({ email, password: hash });

    return user;

}

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ email });
    if(!user){
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Invalid password');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);