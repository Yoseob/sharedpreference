/**
 * Created by leeyoseob on 15. 2. 15.
 */
/**
 * Created by leeyoseob on 15. 2. 14.
 */
var express = require('express');
var router = express.Router();
var dbConnector = require('../dataBaseInterface.js');
var db = dbConnector.getDataBase();
var ObjectId = require('mongodb').ObjectID;


router.route('/friendlist').post(function (req, res) {

    console.log(req.body);
    console.log("friends");

    var result = {result: 410, tsmp: new Date(), data: {}};
    if (req.body.sp_id) {
        findFriendsListWithAccount(req.body.sp_id, function (item) {
            result.data = item;
            result.result = 200;
            res.send(result);
        });
    } else {
        res.send(result);

    }
});

/////친구 목록 받아오기
function findFriendsListWithAccount(account, callback) {
    db.collection('accounts', {safe: true}, function (err, collection) {
        collection.findOne({_id: new ObjectId(account)}, {friendlist: 1}, function (err, item) {
            if (err) throw  err;
            console.log(item);
            callback(item);
        });
    });
}


module.exports = router;