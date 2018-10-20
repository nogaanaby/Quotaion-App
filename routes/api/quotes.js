const express = require('express')
const router = express.Router()

const Quote = require('../../modules/Quote')


router.get('/', (req, res) => {
  Quote.find()
    .sort({date: -1})
    .then(quotes => res.json(quotes))
})

router.get('/:id', (req, res) => {
  Quote.findById(req.params.id)
    .then(quote => res.json(quote))
    .catch(err => res.status(404).json({success: false}))
})

router.post('/', (req, res) => {
  console.log(req.body)
  const newQuote = new Quote({
    name: req.body.name,
    subject: req.body.subject,
    address: {
      city: req.body.address.city,
      street: req.body.address.street,
      houseNumber: req.body.address.houseNumber,
    },
    services: req.body.services,
    totalPrice: req.body.totalPrice,
    discount: req.body.discount,
    comment: req.body.comment
  })

  newQuote.save()
    .then(quote => res.json(quote))
})

router.delete('/:id', (req, res) => {
  Quote.findById(req.params.id)
    .then(quote => quote.remove().then( () => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
})
module.exports = router