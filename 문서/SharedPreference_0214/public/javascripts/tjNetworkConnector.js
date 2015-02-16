/**
 * Created by leeyoseob on 15. 2. 9.
 */

//var db  = dbConnector.getDataBase();


//console.log(db);
function TjNetworkConnector() {

}


TjNetworkConnector.prototype = {
    requestMessage: function (url, sendData, callback) {
        console.log(sendData);
        $.ajax({
            url: 'http://210.118.64.172:8100' + url,
            dataType: 'json',
            data: sendData,
            type: 'POST',
            success: function (result) {
                callback(result);
            }
        });

    },
    loginAndJoin: function (sendData, callback) {
        this.requestMessage('/account/login.facebook', sendData, callback);
    },
    createOrJoinRoom: function (ownerId, callback) {
        this.requestMessage('/createorjoin', ownerId, callback);
    },
    sendChattingMessage: function (chattingRoomId, msg, userid, callback) {
        var body = {};
        body.cRoomId = chattingRoomId;
        body.msg = msg;
        body.ownerId = userid;

        this.requestMessage('/chatting/chatting', body, callback);

    }
};