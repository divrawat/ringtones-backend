var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mongoose = require('mongoose');
require('dotenv/config');
var ringtoneRoutes = require('./routes/ringtones');
var getallsongRoutes = require('./routes/getallsongs');
var authRoutes = require('./routes/auth');
var contactRoutes = require('./routes/contact');

var saveScrapedDataOnStartup = require('./controllers/ringtone').saveScrapedDataOnStartup;

var app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Database connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {})
  .then(function () {
    console.log("DB connected");

    // Trigger scraping automatically after DB connection is successful
    // saveScrapedDataOnStartup();

  })
  .catch(function (err) {
    console.log("DB Error => ", err);
  });

// API routes
app.use('/api', ringtoneRoutes);
app.use('/api', getallsongRoutes);
app.use('/api', authRoutes);
app.use('/api', contactRoutes);

// Default route
app.get('/', function (req, res) {
  res.json("Backend index");
});

// Start the server
var port = 8000;
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
