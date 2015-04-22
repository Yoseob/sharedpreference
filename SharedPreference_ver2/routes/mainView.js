/**
 * Created by leeyoseob on 15. 1. 20.
 */
var express = require('express');
var router = express.Router();
var dbConnector = require('../dataBaseInterface.js');
var db = dbConnector.getDataBase();
var ObjectId = require('mongodb').ObjectID;
/* GET home page. */


router.get('/', function (req, res) {
    console.log(req.body);

    res.render('mainView', {title: 'shared Pre'});
});


router.route('/createorjoin').post(function (req, res) {

    console.log(req.body);
    console.log("createorjoin");
    findGroupOnwerWhoThisId(req.body, res);
});


//ajax 에서 호출된 값을 처리하는 함수 .... 중요
function findGroupOnwerWhoThisId(curruntUserInfo, res) {
    //1.뷰에서 그룹을 찾는것을 요청한다. 그룹을 찾는 쿼리 조건은 그룹오너의아이디와 활성화 상태를
    //기준으로 한다.
    //2_1 찾고자는 그룹이 있으면 그룹 멤버에 자신의 아이디를 추가하고
    //2_2 찾고자는 그룹이 없다는 의미는 내가 방장이라는 의미와 같다.

    db.collection('groups', {safe: true}, function (err, collection) {
        collection.findOne({$and: [{ownerId: curruntUserInfo.ownerId}, {state: "active"}]}, function (err, item) {
            if (err) throw err;

            var data = {};
            data.tsmp = new Date();
            data.data = item;

            console.log(item);
            if (item) {
                //아이템(그룹의 정보가 있다면 해당 그룹 members에 자신의 아이디를 업데이트 한다.)
                console.log('room already exist');
                if (item.ownerId !== curruntUserInfo.ownerId) {
                    console.log(item.ownerId + " , " + curruntUserInfo.ownerId);
                    //멤버 처리
                    //디비 업데이트
                    //
                    updateMembersWithGroupOwnerId(curruntUserInfo.sp_id, item.ownerId);
                }
                data.result = 200;
                res.send(data);
            } else {
                data.result = 200;
                //채팅룸 먼저 만들고 채팅 아이디를 전달한다.
                //그룹이 없음으로 내이름으로 그룹을 생성한다.
                createChattingRoomWithOnwerId({tsmp: new Date(), chats: []}, function (roomId) {

                    createGroupWithOnwerName({
                        tsmp: new Date(),
                        endtsmp: {},
                        ownerId: curruntUserInfo.ownerId,
                        members: [],
                        chattingId: roomId,
                        state: "active"
                    }, function (result) {

                        console.log('createGroupWith');
                        console.log(result);
                        data.data = result[0];
                        res.send(data);

                    });
                });

                //findUser(ownerId , function(userinfo){
                //    createGroupWithOnwerName()
                //});
                console.log("yoseob");

            }


        });
    })
}


//그룹이 존재하는 상황에서 그룹의 멤버 배열에 자신을 추가한다.
function updateMembersWithGroupOwnerId(currentId, ownerId) {
    db.collection('groups', {safe: true}, function (err, collection) {
        if (err) throw err;
        console.log('updateMembersWithGroupOwnerId');
        collection.update({ownerId: ownerId}, {$addToSet: {members: currentId}}, function (err, result) {

            if (err) throw err;
            console.log(result);
        });
    });


}


//그룹을 생서해주는 부분 인자로 생성에 관함 모든 정보와 콜백을 받는다.
function createGroupWithOnwerName(groupQuery, callback) {

    db.collection('groups', {safe: true}, function (err, collection) {
        if (err) throw err;

        collection.insert(groupQuery, function (err, result) {
            if (err) throw err;
            callback(result);
        });
    });
}


// 유저 정보를 찾는 함수 (미사용)
function findUser(ownerInfo, callback) {

    console.log(ownerInfo);
    db.collection('accounts', {safe: true}, function (err, collection) {
        if (err) throw err;

        collection.findOne({username: ownerInfo.ownerId}, function (err, item) {
            if (err) throw err;

            callback(item._id);
            console.log(item);
        });

    });
}

//채팅방 생성
function createChattingRoomWithOnwerId(queryData, callback) {
    db.collection('chatting', {safe: true}, function (err, collection) {
        if (err) throw  err;

        collection.insert(queryData, function (err, result) {
            if (err)  throw err;
            console.log(result);
            if (result) {
                var chattingRoomId = result[0]._id;

                console.log(chattingRoomId);
                callback(chattingRoomId);


            }
        });
    });
}


module.exports = router;
