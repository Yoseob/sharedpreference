/**
 * Created by leeyoseob on 15. 2. 14.
 */
/**
 * Created by leeyoseob on 15. 1. 20.
 */
var express = require('express');

var router = express.Router();

var dbConnector = require('../dataBaseInterface.js');
var db = dbConnector.getDataBase();
var Resmodule = require('../responeseModule');

var ObjectId = require('mongodb').ObjectID;

var graph = require('fbgraph');
var fb = require('fb');

var myFaceBookAppSecret = '3629858ea14fe0e8eb61e368a9839559';
var accessTokenKey = 'accessToken';

var defaultResSet = {result : 400 , stmp : new Date , data : {}};

router.route('/login.facebook').post(function (req, res) {
        var at = req.body.accessToken;
        if (at === undefined) {
            Resmodule._response(res , defaultResSet);
        }
    ckeckOverLapBeforeInsert(req, res, sendLoginAccountInfo);
    prepareFaceBookGraph(at, req.body.facebookId, myFaceBookAppSecret);
    });

router.route('/logout').post(function(req , res){
    if(req.body.sp_id === undefined){
        Resmodule._response(res , defaultResSet);
    }
    logoutProcess(req.body.sp_id , res);
});

router.route('/leave').post(function (req, res) {

});

router.route('/detail').post(function (req, res) {

    var result = {result: 0, tsmp: new Date, data: {}};
    if (req.body.account_id) {
        accountDetailWithAccountId(req.body.account_id, function (accountInfo) {
            if (accountInfo) {
                result.data = accountInfo;
            } else {
                result.result = 403;
            }
            Resmodule._response(res ,result);
        });
    } else {
        result.result = 410;
        Resmodule._response(res ,result);
    }
});

function logoutProcess(sp_id , res){
    db.collection('accounts', {safe: true}, function (err, collection) {
        if (err) throw err;

        collection.update({_id: new ObjectId(sp_id)}, {status :'inactive'}, function (err, ret, obj) {
            if(err) throw  err ;

            if(obj || ret){
                defaultResSet.result = 200;
                defaultResSet.data.state = 'inactive';
                defaultResSet.data.tsmp =  new Date();

                Resmodule._response(res , defaultResSet);
            }
        });
    });
}

//그레프 API를 사용하기 위한 준비과정
function prepareFaceBookGraph(accessToken, fbId, appSecret) {

    graph.setAccessToken(accessToken);
    graph.setAppSecret(appSecret);
    var options = {
        timeout: 3000
        , pool: {maxSockets: Infinity}
        , headers: {connection: "keep-alive"}
    };

    var friends = [];
    graph
        .setOptions(options)
        .get("me?fields=friends", function (err, res) {
            console.log(res);
            if(res.friends.data === undefined || res.friends.data === null){
                Resmodule._response(res , {result: 500, tsmp: new Date(), data: {}});
                return;
            }
            var tempfriends = res.friends.data;

            for (var i = 0; i < tempfriends.length; i++) {
                var friendid = tempfriends[i].id;
                graph.get(friendid + "?fields=picture,name ", function (err, res) {

                    if(err) throw  err ;
                    console.log(res);
                    var user = {};
                    user.url = res.picture.data.url;
                    user.name = res.name;
                    user.id = res.id;

                    updateUserFriendListWithFriendInfo(user, fbId);
                });
            }
            console.log(friends);
        });
}

function updateUserFriendListWithFriendInfo(friendInfo, myFbId) {
    db.collection('accounts', {safe: true}, function (err, collection) {
        if (err) throw err;

        collection.update({facebookId: myFbId}, {$addToSet: {friendlist: friendInfo}}, function (err, ret, obj) {
        });
    });
}


//로그인 중복검사
function ckeckOverLapBeforeInsert(req, res, callback) {


    db.collection('accounts', {safe: true}, function (err, collection) {
        if(err) throw err;
        if (!err) {

            var tReq = req.body;
            console.log(tReq);
            collection.findOne({username: tReq.username}, function (err, item) {
                console.log(err);
                console.log('end');
                console.log(item);

                if (err) throw err;

                if (!item) {
                    callback(req, res);
                } else {
                    //중복 username 이 중복된다.
                    Resmodule._response(res , {result: 409, tsmp: new Date(), data: item});
                }
            });
        }
    });
}


//데이터 삽입 (중복검사 이후)
function sendLoginAccountInfo(req, res) {

    console.log('what the fuck');
    db.collection('accounts', {safe: true}, function (err, collection) {
        if (err) console.log(' fuck  error');

        req.body.tsmp = new Date();
        req.body.status = 'active';
        req.body.friendlist = [];
        req.body.groups = [];

        collection.insert(req.body, function (err, item) {
            console.log(item);
            if (err) throw err;

            var resData = {};
            resData.result = 200;
            resData.tsmp = new Date();
            resData.data = item[0];
            console.log('before resData');
            Resmodule._response(res , resData);
        });
    });

}

function accountDetailWithAccountId(account_id, callback) {
    db.collection('accounts', {safe: true}, function (err, collection) {
        collection.findOne({_id: new ObjectId(account_id)}, function (err, item) {
            if (err) throw  err;

            callback(item);
        });
    });
}

module.exports = router;
