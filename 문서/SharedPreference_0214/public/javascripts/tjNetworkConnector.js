/**
 * Created by leeyoseob on 15. 2. 9.
 */
//var db  = dbConnector.getDataBase();

//console.log(db);
function TjNetworkConnector() {
    this.servername = '';
    this.post = 30;
}

TjNetworkConnector.prototype = {
    requestMessage: function (url, sendData, callback) {
        console.log(sendData);
        $.ajax({
            url: 'http://210.118.64.172:8000' + url,
            dataType: 'json',
            data: sendData,
            type: 'POST',
            success: function (result) {
                callback(result);
            }
        });
    },
    getFriendsList: function(sendData, callback){
        this.requestMessage('/friends/friendlist', sendData, callback);
    },
    loginAndJoin: function (sendData, callback) {
        this.requestMessage('/account/login.facebook', sendData, callback);
    },
    logoutFunc:function(sendData,callback){
        this.requestMessage('/account/leave', sendData, callback);
        console.log("lllll");
    },
    createOrJoinRoom: function (ownerId, callback) {
        this.requestMessage('/createorjoin', ownerId, callback);
    },
    groupCreateOrJoin:function(sendData,callback){
      this.requestMessage('/group/createorjoin',sendData,callback);
    },
    getChatList:function(cRoomId,callback){
      this.requestMessage('/chatting/chated',cRoomId,callback);
    },
    sendChattingMessage: function (chattingRoomId, msg, userid, callback) {
        var body = {};
        body.cRoomId = chattingRoomId;
        body.msg = msg;
        body.ownerId = userid;

        this.requestMessage('/chatting/chatting', body, callback);

    }
};