const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Must have at least 6 characters']
    }
})
userSchema.post('save', function (doc, next) {
    console.log('new user created and saved', doc);
    next();
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('user about to be created and saved', this);
    next();
})


const User = mongoose.model('user', userSchema);

module.exports = User;