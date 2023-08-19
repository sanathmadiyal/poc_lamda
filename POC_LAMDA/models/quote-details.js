var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("a");
    //res.render('index', { title: 'PricePrediction Service' });
});

var createQuote = function(request, getQuoteCB) {
   
}

router.post('/insert', function(request, response) {
    console.log(request.body)
    createQuote(request, function(error, result) {
        // if (error) {
        //     logger.error({
        //         message: 'Error while inserting quote details',
        //         url: request.originalUrl,
        //         data: JSON.stringify(error)
        //     });
        //     response.status(500).send(error);
        // }
        response.send(result);
    });
});

module.exports = router;