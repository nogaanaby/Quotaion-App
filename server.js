const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const quotes = require('./routes/api/quotes')
const services = require('./routes/api/services')


const app = express()

// bodyParser Middleware
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI

//connect to mongoose
mongoose.connect(db, { useNewUrlParser: true } )
  .catch(err => console.log(err))
  .then(() => console.log('MongoDB Connected'))

//Use routes
app.use('/api/quotes', quotes)
app.use('/api/services', services)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//listen on port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`))