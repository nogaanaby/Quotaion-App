const express = require('express')
const router = express.Router()

const Quote = require('../../modules/Quote')


router.get('/', (req, res) => {
  Quote.find()
    .sort({date: -1})
    .then(quotes => res.json(quotes))
})

router.post('/', (req, res) => {
  const newQuote = new Quote({
    name: req.body.name
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