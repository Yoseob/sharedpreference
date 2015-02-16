/**
 * Created by leeyoseob on 15. 1. 20.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('JoinRoom2', {title: 'JoinRoom2'});
});

module.exports = router;
