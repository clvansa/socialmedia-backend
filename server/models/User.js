const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        maxlength: 50
    },
    city: {
        type: String,
        maxlength: 50
    },
    from: {
        type: String,
        maxlength: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
    gender: {
        type: Number,
        enum: [1, 2, 3]
    },
    birthday: {
        type: Date
    },
    work: {
        type: String
    },
    study: {
        type: String
    },
    aboutme: {
        type: String
    },
    userInfo: {
        type: Array
    }

}, { timestamps: true })


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model("User", UserSchema)