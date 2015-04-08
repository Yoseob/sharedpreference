/**
 * Created by leeyoseob on 15. 2. 14.
 */
var express = require('express');
var router = express.Router();
var dbConnector = require('../dataBaseInterface.js');
var db = dbConnector.getDataBase();
var ObjectId = require('mongodb').ObjectID;
var Resmodule = require('../responeseModule');

router.route('/chatting').post(function (req, res) {

    console.log(req.body);
    console.log("chatting");
    recvChattingMessage(req.body, res);
});


router.route('/chated').post(function (req, res) {

    console.log(req.body);
    console.log("chated");
    var cRoomId = req.body.cRoomId;
    getChattedListWithOwnerName(cRoomId, function (croom) {
        console.log(croom);
        console.log('chated' + '');


        var result = {};
        result.tsmp = new Date();

        if (croom !== null) {
            result.result = 200;
            result.data = {chatlist: croom.chats};
        } else {
            result.result = 410;
            data = {};
        }
        Resmodule._response(res ,result);
    });
});


function recvChattingMessage(chatData, res) {
    db.collection('chatting', {safe: true}, function (err, collection) {
        if (err) throw err;
        chatData.updated = new Date();
        console.log(chatData.cRoomId);
        collection.update({_id: new ObjectId(chatData.cRoomId)}, {
            $addToSet: {
                chats: chatData
            }
        }, function (err, ret) {
            if (err) throw  err;

            if (ret)
                Resmodule._response(res ,{result: 200, tsmp: new Date, data: {}});

            console.log(ret);
        });

    });
}

function getChattedListWithOwnerName(cRoomId, callback) {
    db.collection('chatting', {safe: true}, function (err, collection) {
        collection.findOne({_id: new ObjectId(cRoomId)}, function (err, item) {
            if (err) throw  err;
            callback(item);
        });
    });

}

module.exports = router;