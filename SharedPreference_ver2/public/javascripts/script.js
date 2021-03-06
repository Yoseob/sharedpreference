var videos = [];
var MediaStreams = [];
var PeerConnection = window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.RTCPeerConnection;
var CurrentVideo = {};
var userinfo = new DefaultUserinfo();
var cnt=0;
//태양 - 추가부분. 여기서 발생한 Stream을 Sun of Script로 가져가기위해 추가.
function getMediaStreams(){
    return MediaStreams;
}
//태양 - 추가부분. 여기서 발생한 Stream을 Sun of Script로 가져가기위해 추가.

function swapVideo(cVideo, tVideo) {
    var tempVideoSrc;
    tempVideoSrc = cVideo.src;
    cVideo.src = tVideo.src;
    tVideo.src = tempVideoSrc;
    CurrentVideo = tVideo;
}

function getNumPerRow() {
    var len = videos.length;
    var biggest;

    // Ensure length is even for better division.
    if (len % 2 === 1) {
        len++;
    }

    biggest = Math.ceil(Math.sqrt(len));
    while (len % biggest !== 0) {
        biggest++;
    }
    return biggest;
}

function subdivideVideos() {
    var perRow = getNumPerRow();
    var numInRow = 0;
    for (var i = 0, len = videos.length; i < len; i++) {
        var video = videos[i];
        setWH(video, i);
        numInRow = (numInRow + 1) % perRow;
    }
}

function setWH(video, i) {
    var perRow = getNumPerRow();
    var perColumn = Math.ceil(videos.length / perRow);
    var width = Math.floor((window.innerWidth) / perRow);
    var height = Math.floor((window.innerHeight - 190) / perColumn);
    video.width = width;
    video.height = height;
    video.style.position = "absolute";
    video.style.left = (i % perRow) * width + "px";
    video.style.top = Math.floor(i / perRow) * height + "px";
}

function cloneVideo(domId, socketId) {
    var span = document.createElement('span');

    //console.log('ClientWidth : ' + ClientWidth);
    span.className = "col-md-3 col-sm-3 col-xs-3";

    // span.setAttribute('style',"margin-left:5%");
    var video = document.getElementById(domId);
    var clone = video.cloneNode(false);
    clone.id = "remote" + socketId;
    clone.className = "remoteVideo";

    //span.setattribute("style","height:90%");
    //clone.setattribute("style","height:90%");
    span.appendChild(clone);


    videos.push(clone);

    $('#minivideos').append(span);
    /*태양 추가부분 - footer 비디오 5개 이상되면 비디오 사이즈 재조정*/
    if (videos.length >= 5) {
        $('#minivideos>*').css('height', '45%');
        $('#minivideos>*').css('margin-bottom', '2px');
    }
    /*태양 추가부분 - footer 비디오 5개 이상되면 비디오 사이즈 재조정*/

    //미니 Video 누르면 큰 화면의 Video랑 바뀌는 함수
    clone.onclick = function () {
        swapVideo(clone, CurrentVideo);
    };


    //var video = document.getElementById(domId);
    //var clone = video.cloneNode(false);
    //clone.id = "remote" + socketId;
    //document.getElementById('videos').appendChild(clone);
    //videos.push(clone);
    return clone;
}
function removeVideo(socketId) {
    var video = document.getElementById('remote' + socketId);
    if (video) {
        videos.splice(videos.indexOf(video), 1);
        video.parentNode.remove(video);
    }
}

function addToChat(msg, color) {
    //var messages = document.getElementById('messages');
    var messages = document.getElementById('results');
    var messages2 = document.getElementById('results2');
    var cRoom = userinfo.getCurrectChattingRoom();
    var userId = userinfo.getUserId();
    console.log(cRoom + " " + userId);
    var tj = new TjNetworkConnector();
    tj.sendChattingMessage(cRoom, msg, userId, function (ret) {
        console.log(ret);
    });

    var chatName=new DefaultUserinfo();
    var curUserName=chatName.getUserName();
    //광열 - 그룹 채팅 대화 가져오기.
   // var gy=new TjNetworkConnector();
  //  gy.getChatList(cRoom,getChatData);

    msg = sanitize(msg);

    console.log("initMsgTest");

    msg.trim();
    if (msg != '' && color == '#010101') {
        msg = '<div class="bubble bubble-alt green" style="color:#ffffff; padding-left: 15px; float:right;">' + msg + '</div>' + '<br><br><br><br>';
    }
    else if (color && msg != '') {
        msg = '<div class="bubble white" style="color: ' + color + '; padding-left: 15px; float:left;">' + msg + '</div>' + '<br><br><br><br>';
    } else if (msg != '') {
        msg = '<div class="bubble bubble-alt green" style="color: white; padding-left: 15px; float:right;">' + msg + '</div>' + '<br><br><br><br>';
    }
    messages.innerHTML = messages.innerHTML + msg;
    messages.scrollTop = 10000;
    messages2.innerHTML = messages2.innerHTML + msg;
    messages2.scrollTop = 10000;
}

function sanitize(msg) {

    return msg.replace(/</g, '&lt;');
}

function initFullScreen() {
    var button = document.getElementById("fullscreen");
    button.addEventListener('click', function (event) {
        var elem = document.getElementById("videos");
        //show full screen
        elem.webkitRequestFullScreen();
    });
}

(function initNewRoom() {


    for (var tRoomname in rtc.rooms) {
        console.log(tRoomname);
    }
    var roomname = userinfo.getUserName();
    var targetuser = userinfo.getTargetUser();



    if (roomname !== null) {
        window.location.hash = roomname;
    }
    if(targetuser !== null  && targetuser !== '' ){
        window.location.hash = targetuser;
    }


})();

//
//var websocketChat = {
//    send: function (message) {
//        rtc._socket.send(message);
//    },
//    recv: function (message) {
//        return message;
//    },
//    event: 'receive_chat_msg'
//};

var dataChannelChat = {
    send: function (message) {
        console.log(message);
        for (var connection in rtc.dataChannels) {
            var channel = rtc.dataChannels[connection];
            channel.send(message);
        }
    },
    recv: function (channel, message) {
        return JSON.parse(message).data;
    },
    event: 'data stream data'
};

function initChat() {
    var chat;
    var keyFlg=1;
    var keyFlg2=0;

    if (rtc.dataChannelSupport) {
        console.log('initializing data channel chat');
        chat = dataChannelChat;
    } else {
        console.log('initializing websocket chat');
        //chat = websocketChat;
    }

    var input = document.getElementById("chatinput");
    var input2 = document.getElementById("chatinput2");
    var toggleHideShow = document.getElementById("hideShowMessages");
    var room = window.location.hash.slice(1);
    var color = "#" + 000;

    toggleHideShow.addEventListener('click', function () {
        var element = document.getElementById("results");

        if (element.style.display === "block") {
            element.style.display = "none";
        }
        else {
            element.style.display = "block";
        }

    });


    var spaceEnable = false;
    $("#chatinput").on({

        keydown:function(e) {

            if (e.which === 32) {

                if(input.value.length == 0) return false;
                return spaceEnable;
            }

            else if(e.which===13){
                spaceEnable = false;

                console.log("msgTest");
                chat.send(JSON.stringify({
                    "eventName": "chat_msg",
                    "data": {
                        "messages": input.value,
                        "room": room,
                        "color": color
                    }
                }));
                console.log(input.value);

                console.log("msg11111111111");
                addToChat(input.value);
                input.value = "";
            }
            else spaceEnable = true;
        },
            change:function(){
                this.value=this.value.replace(/\s/g, "");
            }

    },false);
    rtc.on(chat.event, function () {
        var data = chat.recv.apply(this, arguments);
        console.log(data.color);
        console.log(data.messages);
        console.log("msg222222222");
        addToChat(data.messages, data.color.toString(16));
    });
    $("#chatinput2").on({

        keydown:function(e) {
            // console.log(e);
//            var keyFlg=1;
//            var keyFlg2=0;
            // console.log(cnt);
            if (e.which === 32) {

                //keyFlg=keyFlg2;
                //console.log(keyFlg);
                if(input2.value.length == 0) return false;
                return spaceEnable;
            }

            else if(e.which===13){
                spaceEnable = false;

                console.log("msgTest");
                chat.send(JSON.stringify({
                    "eventName": "chat_msg",
                    "data": {
                        "messages": input2.value,
                        "room": room,
                        "color": color
                    }
                }));
                console.log(input2.value);
                console.log("msg33333333");
                addToChat(input2.value);
                input2.value = "";
            }
            else spaceEnable = true;
        },
        change:function(){
            this.value=this.value.replace(/\s/g, "");
        }

    },false);

    rtc.on(chat.event, function () {
        var data = chat.recv.apply(this, arguments);
        console.log(data.color);
        console.log(data.messages);
        console.log("msg44444444");
        //addToChat(data.messages, data.color.toString(16));
    });
}


function sharescreen(strema){
   CurrentVideo.attachStream(stream , CurrentVideo.id);
}
function windowShareInit(){

    $("#glyphicon-sharescreen").click(function(){
        chrome.tabCapture.capture({audio :  true , video : true } , sharescreen);
    });
}

function init() {

    var da = new Date();
    console.log('22222!!!! '+da.getHours()+':'+da.getMinutes()+':'+da.getSeconds());
    console.log('init');
    if (PeerConnection) {
        rtc.createStream({
            "video": {"mandatory": {}, "optional": []},
            "audio": true
        }, function (stream) {


            console.log('success attachStream isStrema : ' + stream);
            var BigVideo = {};
            BigVideo = rtc.attachStream(stream, 'local-video');
            CurrentVideo = BigVideo;
            MediaStreams.push(stream);
            userinfo.setTargetUser('');

            var sendData = {};
            sendData.ownerId = window.location.hash.slice(1);
            sendData.sp_id = userinfo.getUserId();
            //디비에서 상태값 활성과 방장 이름이 있는는 그룹이 없으면 생성 있으면 ///  멤버로 추가
            var tj = new TjNetworkConnector();
            tj.createOrJoinRoom(sendData, function (result) {
                console.log(result);
                //자신의 채팅방을 등록한다.
                //채팅을 하기위해선 리턴 받은 방의 아이디를 저장한후 사용한다.
                userinfo.setCurrentChattingRoom(result.data.chattingId);
            });
            windowShareInit();

        });
    } else {
        alert('Your browser is not supported or you have to turn on flags. In chrome you go to chrome://flags and turn on Enable PeerConnection remember to restart chrome');
    }


    var room = window.location.hash.slice(1);
    rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split('#')[0], room);


    rtc.on('add remote stream', function (stream, socketId) {
        console.log("ADDING REMOTE STREAM...");
        var clone = cloneVideo('local-video', socketId);
        //document.getElementById(clone.id).setAttribute("class", "");
        var Trashvideo = {};
        Trashvideo = rtc.attachStream(stream, clone.id);
        MediaStreams.push(stream);
        userinfo.setTargetUser('');
    });
    rtc.on('disconnect stream', function (data) {
        console.log('remove ' + data);
        removeVideo(data);


        /* 태양 추가부분 ,  footer 비디오 5개 이상에서 4개 이하가 될시에 footer 비디오 사이즈 재조정*/
        if (videos.length <= 4) {
            $('#minivideos>*').css('height', '95%');
            $('#minivideos>*').css('margin-bottom', '0px');
        }
        MediaStreams.pop();
        /*태양 추가부분 footer 비디오 5개 이상에서 4개 이하가 될시에 footer 비디오 사이즈 재조정*/

    });
    //initFullScreen();
    //initNewRoom();
    setupfriendList();
    initChat();
    //광열
    //initGroup();
   // getGroupMember();
}