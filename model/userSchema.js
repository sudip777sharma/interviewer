const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: '../config.env' });
// const dotenv = require('dotenv');
// dotenv.config({ path: '../config.env' });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    overallScore: {
        type: String
    },
    bestScore: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// hashing is done using pre
userSchema.pre('save', async function(next) {
    console.log("---userSchema.js------------------------------------");
    console.log("password is getting encrypted...")
    console.log("------------------------------------userSchema.js---");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// we are generating token
userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, `${process.env.SECRET_KEY}`);
        // this.tokens = this.tokens.concat({ token: token });
        this.tokens = { token: token };
        await this.save();
        return token;
    } catch (err) {
        console.log("---userSchema.js------------------------------------");
        console.log(err);
        console.log("------------------------------------userSchema.js---");
    }
}

const user = mongoose.model('USER', userSchema);

module.exports = user;