/**
 * Created by leeyoseob on 15. 1. 20.
 */
var express = require('express');

var router = express.Router();


router.get('/', function (req, res) {

    res.render('LoginView', {title: 'LoginView'});
});


module.exports = router;
