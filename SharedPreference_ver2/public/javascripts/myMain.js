/**
 * Created by leeyoseob on 15. 1. 15.
 */

//------init-------//
var socket = io.connect();
var roomName = prompt('방이름 입력 ㄲㄲ');

var sendChannel;
var isInitator;
var isStarted;
var pc;
var isChannelReady;
var localStream;
var remoteStream;
var turnReady;
var constraints = {video: true, audio: true};

var pc_config = webrtcDetectedBrowser === 'firefox' ?
{'iceServers': [{'url': 'stun:23.21.150.121'}]} : // number IP
{'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};

var pc_constraints = {
    'optional': [
        {'DtlsSrtpKeyAgreement': true},
        {'RtpDataChannels': true}
    ]
};

var sdpConstraints = {
    'mandatory': {
        'OfferToReceiveAudio': true,
        'OfferToReceiveVideo': true
    }
};


if (roomName) {
    socket.emit('createORjoin', roomName);
}
socket.on('created', function (room) {
    $('#title').text(room);
    $('title').text(room);
    isInitator = true;
    console.log('created room : ' + room);
});

socket.on('joined', function (room) {
    console.log('joined : ', room);
    isChannelReady = true;
});

function sendMessage(message) {
    console.log(message);
    socket.emit('message', message);
}

socket.on('message', function (message) {

    console.log('received message : ' + message);
    if (message === 'got user media') {
        maybeStart();
    } else if (message.type === 'offer') {
        if (!isStarted && isInitator) {
            maybeStart();
        }
        pc.setRemoteDescription(new RTCSessionDescription(message));
        doAnswer();
    } else if (message.type === 'answer' && isStarted) {
        pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && isStarted) {
        var candidate = new RTCIceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
        pc.addIceCandidate(candidate);
    } else if (message === ' bye' && isStarted) {
        handleRemoteHangup();
    }

});

//비디오 셋팅
var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');


// 에러 핸들러
function mediaHandlerError(error) {
    console.log('fuck ' + error);
}

//callback 핸들러
function handlerOfUsermedia(stream) {

    console.log('success media get ');
    localStream = stream;
    attachMediaStream(localVideo, localStream);
    sendMessage('got user media');
    if (isInitator) {
        maybeStart()
    }
}


getUserMedia(constraints, handlerOfUsermedia, mediaHandlerError);

function maybeStart() {
    if (!isStarted && localStream && isChannelReady) {
        createPeerConnection();
        pc.addStream(localStream);
        isStarted = true;
        if (isInitator) {
            doCall();
        }
    }
}

function createPeerConnection() {
    try {
        pc = new RTCPeerConnection(pc_config, pc_constraints);
        pc.onicecandidate = handleIceCandidate;
        console.log('Created RTCPeerConnnection with:\n' +
        '  config: \'' + JSON.stringify(pc_config) + '\';\n' +
        '  constraints: \'' + JSON.stringify(pc_constraints) + '\'.');
    } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
        return;
    }

    pc.anaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;

    if (isInitator) {
        try {
            sendChannel = pc.createDataChannel('sendDataChannel', {reliable: false});
            sendChannel.onmessage = handleMessage;
            trace('Create send data channel');

        } catch (e) {

        }
        sendChannel.onopen = handleSendChannelStateChange;
        sendChannel.onclose = handleSendChannelStateChange();
    } else {
        pc.ondatachannel = gotReceiveChannel;
    }
}

function sendData() {
    var data = sendTextarea.value;
    sendChannel.send(data);
    trace('Sent data: ' + data);
}

function gotReceiveChannel(event) {
    trace('Receive Channel Callback');
    sendChannel = event.channel;
    sendChannel.onmessage = handleMessage;
    sendChannel.onopen = handleReceiveChannelStateChange;
    sendChannel.onclose = handleReceiveChannelStateChange;
}

function handleMessage(event) {
    trace('Received message: ' + event.data);
    receiveTextarea.value = event.data;
}

function handleSendChannelStateChange() {
    var readyState = sendChannel.readyState;
    trace('Send channel state is: ' + readyState);
    enableMessageInterface(readyState == "open");
}

function handleReceiveChannelStateChange() {
    var readyState = sendChannel.readyState;
    trace('Receive channel state is: ' + readyState);
    enableMessageInterface(readyState == "open");
}

function enableMessageInterface(shouldEnable) {
    if (shouldEnable) {
        dataChannelSend.disabled = false;
        dataChannelSend.focus();
        dataChannelSend.placeholder = "";
        sendButton.disabled = false;
    } else {
        dataChannelSend.disabled = true;
        sendButton.disabled = true;
    }
}
function handleIceCandidate(event) {
    console.log('handleIceCandidate = ' + event);
    if (event.candidate) {
        sendMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
        });
    } else {

    }
}
function doCall() {
    var constraints = {'optional': [], 'mandatory': {'MozDontOfferDataChannel': true}};
    if (webrtcDetectedBrowser === 'chrome') {
        for (var prop in constraints.mandatory) {
            if (prop.indexOf('Moz') !== -1) {
                delete constraints.mandatory[prop];
            }
        }
    }
    constraints = mergeConstraints(constraints, sdpConstraints);
    console.log('sending offer to peer , with constraint : \n' + JSON.stringify(constraints));
    pc.createOffer(setLocalAndsendMessage, null, constraints);
}
function doAnswer() {
    pc.createAnswer(setLocalAndsendMessage, null, sdpConstraints);
}

function mergeConstraints(cons1, cons2) {
    var merged = cons1;
    for (var name in cons2.mandatory) {
        merged.mandatory[name] = cons2.mandatory[name];
    }
    merged.optional.concat(cons2.optional);
    return merged;
}

function setLocalAndsendMessage(sessionDescription) {
    sessionDescription.sdp = preferOpus(sessionDescription.sdp);
    pc.setLocalDescription(sessionDescription);
    sendMessage(sessionDescription);
}

function requsetTurn(turn_url) {
    var turnExist = false;
    for (var i in pc_config.iceServer) {
        if (pc_config.iceServers[i].url.substr(0, 5) === 'turn:') {
            turnExist = true;
            turnReady = true;
            break;
        }
    }

    if (!turnExist) {
        console.log('getting Turn server from : ', turn_url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var turnServer = JSON.parse(xhr.responseText);
                console.log('got turn server :  ' + turnServer);
                pc_config.iceServers.push({
                    'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
                    'credential': turnServer.password
                });
                turnReady = true;

            }
        };
        xhr.open('GET', turn_url, true);
        xhr.send();

    }

}


function handleRemoteStreamAdded(event) {
    console.log('remote stream added');
    attachMediaStream(remoteStream, event.stream);
    remoteStream = event.stream;
}
function handleRemoteStreamRemoved(event) {
    console.log('remote stream added Error : ' + event);
}

function hangup() {
    console.log('Hanging up.');
    stop();
    sendMessage('bye');
}

function handleRemoteHangup() {
    console.log('Session terminated.');
    stop();
    isInitiator = false;
}

function stop() {
    isStarted = false;
    // isAudioMuted = false;
    // isVideoMuted = false;
    pc.close();
    pc = null;
}

function preferOpus(sdp) {
    var sdpLines = sdp.split('\r\n');
    var mLineIndex;
    for (var i = 0; i < sdpLines.length; i++) {
        if (sdpLinesp[i].search('m=audio') !== -1) {
            mLineIndex = i;
            break;
        }
    }
    if (mLineIndex === null) {
        return sdp;
    }
    for (i = 0; i < sdpLines.length; i++) {
        if (sdpLines[i].search('opus/48000') !== -1) {
            var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
            if (opusPayload) {
                sdpLines[mLineIndex] = setDefualtCodec(sdpLines[mLineIndex], opusPayload);

            }
            break;
        }
    }

    sdpLines = removeCN(sdpLines, mLineIndex);
    sdp = sdpLines.join('\r\n');
    return sdp;
}


function extractSdp(sdpLine, pattern) {
    var result = sdpLine.match(pattern);
    return result && result.length === 2 ? result[1] : null;
}

// Set the selected codec to the first in m line.
function setDefaultCodec(mLine, payload) {
    var elements = mLine.split(' ');
    var newLine = [];
    var index = 0;
    for (var i = 0; i < elements.length; i++) {
        if (index === 3) { // Format of media starts from the fourth.
            newLine[index++] = payload; // Put target payload to the first.
        }
        if (elements[i] !== payload) {
            newLine[index++] = elements[i];
        }
    }
    return newLine.join(' ');
}

// Strip CN from sdp before CN constraints is ready.
function removeCN(sdpLines, mLineIndex) {
    var mLineElements = sdpLines[mLineIndex].split(' ');
    // Scan from end for the convenience of removing an item.
    for (var i = sdpLines.length - 1; i >= 0; i--) {
        var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
        if (payload) {
            var cnPos = mLineElements.indexOf(payload);
            if (cnPos !== -1) {
                // Remove CN payload from m line.
                mLineElements.splice(cnPos, 1);
            }
            // Remove CN line in sdp
            sdpLines.splice(i, 1);
        }
    }

    sdpLines[mLineIndex] = mLineElements.join(' ');
    return sdpLines;
}
