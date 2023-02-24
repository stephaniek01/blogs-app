const mongoose = require('mongoose');

const keys = require('../config/keys');
require('../models/User');

mongoose.connect(keys.mongoTestURI);

console.log('Jest config running');
