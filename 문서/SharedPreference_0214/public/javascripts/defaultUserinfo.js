/**
 * Created by leeyoseob on 15. 2. 14.
 */

function DefaultUserinfo() {


}

DefaultUserinfo.prototype = {
    _username: 'username',
    _id: 'spUserId',
    _chattingRoom: 'chattingRoomId',


    setUserName: function (username) {
        console.log(username);
        localStorage.setItem(this._username, username);
    },
    getUserName: function () {
        return localStorage.getItem(this._username);
    },


    setUserId: function (id) {
        localStorage.setItem(this._id, id);
    },
    getUserId: function () {
        return localStorage.getItem(this._id);
    },

    setCurrentChattingRoom: function (chattingRoom) {
        localStorage.setItem(this._chattingRoom, chattingRoom);
    },

    getCurrectChattingRoom: function () {
        return localStorage.getItem(this._chattingRoom);
    }


};