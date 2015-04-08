/**
 * Created by leeyoseob on 15. 2. 25.
 */
/**
 * Created by leeyoseob on 15. 1. 20.
 */
var express = require('express');

var router = express.Router();


router.get('/', function (req, res) {

    res.render('fileTransfer', {title: 'file'});
});


module.exports = router;
