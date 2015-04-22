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
       // console.log(sendData);
        $.ajax({
            url: 'http://tjchat.com' + url,
            dataType: 'json',
            data: sendData,
            type: 'POST',
            success: function (result) {
                callback(result);
            }
        });
    },
    checkTheRoomExist: function(sendData, callback){
        this.requestMessage('/group/check', sendData, callback);
    },
    getFriendsList: function(sendData, callback){
        this.requestMessage('/friends/friendlist', sendData, callback);
    },
    loginAndJoin: function (sendData, callback) {
        this.requestMessage('/account/login.facebook', sendData, callback);
    },
    logoutFunc:function(sendData,callback){
        this.requestMessage('/account/leave', sendData, callback);
        //console.log("lllll");
    },
    createOrJoinRoom: function (ownerId, callback) {
        this.requestMessage('/createorjoin', ownerId, callback);
    },
    groupCreateOrJoin:function(sendData,callback){
      this.requestMessage('/group/createorjoin',sendData,callback);
    },
    /*
    getChatList:function(cRoomId,callback){
        console.log('그룹채팅');
      this.requestMessage('/chatting/chated',cRoomId,callback);
        console.log('그룹채팅2');
    },*/
    sendChattingMessage: function (chattingRoomId, msg, userid, callback) {
        var body = {};
        body.cRoomId = chattingRoomId;
        body.msg = msg;
        body.ownerId = userid;

        this.requestMessage('/chatting/chatting', body, callback);

    }
};