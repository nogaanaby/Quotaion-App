const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const QuoteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subject:{
    type: String,
    default: ''
  },
  address: {
    type: Object,
    default: {
      city: '',
      street: '',
      houseNumber: 0
    }
  },
  services: {
    type: Array,
    default: []
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  comment: {
    type: String,
    default: ''    
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Quote = mongoose.model('quote', QuoteSchema)