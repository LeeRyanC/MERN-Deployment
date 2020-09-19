const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Pet name must be at least 3 characters"],
        unique: true
    },
    type: {
        type: String,
        required: true,
        minlength: [3, "Pet type must be at least 3 characters"]
    },
    description: {
        type: String,
        required: true,
        minlength: [3, "Pet description must be at least 3 characters"]
    },
    skill1: {
        type: String,
        required: false,
    },
    skill2: {
        type: String,
        required: false,
    },
    skill3: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        required: false,
    }
}, {timestamps: true});

petSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

let Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;