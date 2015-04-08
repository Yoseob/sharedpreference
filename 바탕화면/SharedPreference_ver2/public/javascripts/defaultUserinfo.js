/**
 * Created by leeyoseob on 15. 2. 14.
 */

function DefaultUserinfo() {


}

DefaultUserinfo.prototype = {
    _username: 'username',
    _id: 'spUserId',
    _chattingRoom: 'chattingRoomId',
    _targetUser : 'target',

    setTargetUser : function (targetUserName){
        localStorage.setItem(this._targetUser, targetUserName);
    },
    getTargetUser : function(){
        return localStorage.getItem(this._targetUser);
    },


    setUserName: function (username) {
        console.log(username);
        localStorage.setItem(this._username, username);
    },
    getUserName: function () {
        return localStorage.getItem(this._username);
    },


    //사용자 자신의 아이
    setUserId: function (id) {
        localStorage.setItem(this._id, id);
    },
    getUserId: function () {
        return localStorage.getItem(this._id);
    },

    //채팅방 아이디
    setCurrentChattingRoom: function (chattingRoom) {
        localStorage.setItem(this._chattingRoom, chattingRoom);
    },

    getCurrectChattingRoom: function () {
        return localStorage.getItem(this._chattingRoom);
    }

};