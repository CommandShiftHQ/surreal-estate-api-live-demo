const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: String,
    type: String,
    bedrooms: Number,
    bathrooms: Number,
    price: Number,
    city: String,
    email: String
});

const propertyModel = mongoose.model("Property", propertySchema);

module.exports = propertyModel;