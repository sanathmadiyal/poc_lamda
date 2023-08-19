var express = require('express');
var router = express.Router();
var qouteDetails = require('./quote-details');

router.use('/', qouteDetails);

module.exports = router;