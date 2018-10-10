const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const QuoteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Quote = mongoose.model('quote', QuoteSchema)