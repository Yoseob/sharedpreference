/**
 * Created by KimSangYun on 2015-02-17.
 */
var RecDate;
var Friends = [];
var userInfo = new DefaultUserinfo();
$('#glyphicon-sharescreen').click(function(){


});


//화면크기 조절을 감지하여 footer의 높이를 조절해주는 함수
window.onresize = function resizeFooterHeight() {
    var ClientWidth = document.body.clientWidth;
    var ClientHeight = document.body.clientHeight;
// 화면의 넓이가 높이보다 좁아지면 (화면이 세로로 길어지면)
    if(ClientWidth < ClientHeight){
        $('#footer').css('height',ClientWidth/4 + 'px');
    }else{
        $('#footer').css('height',ClientHeight/4+'px');
    }
};

/*친구목록에 마우스휨이 동작하게 하는 부분*/
if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

// 마우스 휠~
function handle(delta) {
    var s = delta + ": ";
    if (delta < 0) {
    }
    else {
    }
}

//마우스 이벤트
function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta/120;
        if (window.opera) delta = -delta;
    } else if (event.detail) delta = -event.detail/3;
    if (delta) handle(delta);
}
/*친구목록에 마우스휨이 동작하게 하는 부분*/


$(document).ready(function() {
    $('#sidebar-wrapper').mouseenter(function(){
        if($('#sidebar-wrapper').hover()){
            $('#sidebar-wrapper').css('-webkit-transform', 'translate(130px,0px)');
        }
    });
    $('#sidebar-wrapper').mouseleave(function(){
        $('#sidebar-wrapper').css('-webkit-transform', 'translate(-0px,0px)');
    });


    $('#glyphicon-record').mouseenter(function(){
        if($('#sidebar-wrapper').hover()){
            $('#guidemsg').append("영상 녹화 On/Off");
            $('#guidemsg').css('width', '120px');
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-record').mouseleave(function(){
        $('#guidemsg').empty();
        $('#guidemsg').css('width', '125px');
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-comment').mouseenter(function(){
        if($('#sidebar-wrapper').hover()){
            $('#guidemsg').css('width', '105px');
            $('#guidemsg').append("채팅창 On/Off");
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-comment').mouseleave(function(){
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-sharescreen').mouseenter(function(){
        if($('#sidebar-wrapper').hover()){
            $('#guidemsg').append("화면 공유 On/Off");
            $('#guidemsg').css('width', '120px');
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-sharescreen').mouseleave(function(){
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-repeat').mouseenter(function(){
        if($('#sidebar-wrapper').hover()){
            $('#guidemsg').append("녹화영상 다시보기");
            $('#guidemsg').css('width', '120px');
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-repeat').mouseleave(function(){
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-logout').mouseenter(function(){
        if($('#glyphicon-logout').hover()){
            $('#guidemsg').css('width', '60px');
            $('#guidemsg').append("로그아웃");
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-logout').mouseleave(function(){
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

});

//채팅 버튼 눌렀을 때 채팅창 뜨게 하는 함수  - 태양
$(document).ready(function(){
    var chat;
    $('#glyphicon-comment').click(function(){
        //채팅창이 없었을 경우 클릭시 if문 수행
        if ($('#chatting-space').css("display") === 'none') {
            $('#chatting-space').css('display', 'block');
            $('#chatting-space').css('-webkit-transform', 'translate(570px, 0px)');
            $('#Wvideos').css('width', 'calc(80% - 70px)');
            $('#Wvideos').css('margin-left', 'calc(20% + 70px)');
            $('#footer').css('width', 'calc(75% - 70px)');
            $('#footer').css('margin-left', 'calc(25% + 70px)');
            $('#Recorded-Video-container').css('width', 'calc(80% - 70px)');
            $('#Recorded-Video-container').css('margin-left', 'calc(20% + 70px)');
        }
        //채팅창이 있었을 경우 클릭시 else문 수행
        else {
            $('#Wvideos').css('margin-left', '70px');
            $('#Wvideos').css('width', 'calc(100% - 70px)');
            $('#footer').css('width', 'calc(95% - 70px)');
            $('#footer').css('margin-left', 'calc(5% + 70px)');
            $('#Recorded-Video-container').css('margin-left', '70px');
            $('#Recorded-Video-container').css('width', 'calc(100% - 70px)');
            setTimeout(function(){
                $('#chatting-space').css('-webkit-transform', 'translate(-570px, 0px)');
                $('#chatting-space').css('display', 'none');
            },200);
        }
    });
});

//녹화목록보기 버튼 눌렀을 때 목록 뜨게 하는 함수  - 태양
$(document).ready(function(){
    $('#glyphicon-repeat').click(function(){
        //녹화리스트가 화면에 없었을 경우 클릭시 if문 수행
        if ($('#Recorded-List-container').css('display') === 'none') {
            $('#Recorded-List-container').css('display', 'block');
            $('#Recorded-List-container').css('-webkit-transform', 'translate(570px, 0px)');
            $('#Wvideos').css('width', 'calc(80% - 70px)');
            $('#Wvideos').css('margin-left', 'calc(20% + 70px)');
            $('#footer').css('width', 'calc(75% - 70px)');
            $('#footer').css('margin-left', 'calc(25% + 70px)');
            $('#Recorded-Video-container').css('width', 'calc(80% - 70px)');
            $('#Recorded-Video-container').css('margin-left', 'calc(20% + 70px)');

        }
        //녹화리스트가 화면에  있었을 경우 클릭시 else문 수행
        else {
            $('#Wvideos').css('margin-left', '70px');
            $('#Wvideos').css('width', 'calc(100% - 70px)');
            $('#footer').css('width', 'calc(95% - 70px)');
            $('#footer').css('margin-left', 'calc(5% + 70px)');
            $('#Recorded-Video-container').css('margin-left', '70px');
            $('#Recorded-Video-container').css('width', 'calc(100% - 70px)');
            //$('#chatting-space').slideToggle('slow');

            setTimeout(function(){
                $('#Recorded-List-container').css('-webkit-transform', 'translate(-570px, 0px)');
                $('#Recorded-List-container').css('display', 'none');
             },200);


        }
    });
});

function setupfriendList(){
    var _id = userInfo.getUserId();

    var nc = new TjNetworkConnector();
    nc.getFriendsList({sp_id:_id}, initFriendsList);
}

function initFriendsList(result){
    console.log(result);
    var data = result.data;
    Friends = data.friendlist;
    console.log(Friends);


    for(var i=0;i<Friends.length; i++){
        var li_ = document.createElement('li');
        var img_ = document.createElement('img');
        var p_ = document.createElement('p');


        li_.id = Friends[i].id;
        p_.textContent = Friends[i].name;
        //li_.textContent = Friends[i].name;
        img_.className = "profileimgs";
        img_.src = Friends[i].url;

        li_.appendChild(p_);
        li_.appendChild(img_);

        li_.onclick= function(){
            userInfo.setTargetUser(p_.textContent);
            //window.location.reload();
            rtc.on('disconnect stream', function (data) {
                MediaStreams.pop();
            });
            //location.href = 'http://210.118.64.172:8000/#'+ userInfo.getTargetUser();
            history.go(0);
        };
        li_.onmouseover= function(){
            this.setAttribute('style', 'background-color:#999');
        };
        li_.onmouseout= function(){
            this.setAttribute('style', 'background-color:#383838');
        };
        $('.sidebar-friends').append(li_);
    }
}
var recorflag = 0;
var AudioRecorder;
var MediaStreams = [];
var MediaStreamLength=0;
var VideoRecorder0;
var VideoRecorder1;
var VideoRecorder2;
var VideoRecorder3;
var VideoRecorder4;
var VideoRecorder5;
var VideoRecorder6;
var VideoRecorder7;
var VideoRecorder8;


$('#glyphicon-record').click(function() {
    //요섭이형의 script.js로 부터 MediaStreams을 받아온다.
    MediaStreams = getMediaStreams();
    //녹화중이 아니었다면 녹화를 시작한다.
    if (recorflag === 0) {
        $('#Alert-space-text').append("녹화가 시작됩니다.");
        $('#Alert-space').css('-webkit-transform', 'translate(0px, 25%)');
        setTimeout(function(){
            $('#Alert-space').css('-webkit-transform', 'translate(0px, -25%)');
            $('#Alert-space-text').empty();
        },1500);
        //alert('녹화를 시작합니다.');
        $('#recordimg').css('display','block');
        recorflag = 1;
        MediaStreamLength = MediaStreams.length;

        AudioRecorder = new RecordRTC(MediaStreams[0], {
            type: 'audio'
        });
        AudioRecorder.startRecording();
        VideoRecorder0 = new RecordRTC(MediaStreams[0], {
            type: 'video'
        });
        VideoRecorder0.startRecording();
        if(MediaStreamLength === 1) return;
        VideoRecorder1 = new RecordRTC(MediaStreams[1], {
            type: 'video'
        });
        VideoRecorder1.startRecording();
        if(MediaStreamLength === 2) return;
        VideoRecorder2 = new RecordRTC(MediaStreams[2], {
            type: 'video'
        });
        VideoRecorder2.startRecording();
        if(MediaStreamLength === 3) return;
        VideoRecorder3 = new RecordRTC(MediaStreams[3], {
            type: 'video'
        });
        VideoRecorder3.startRecording();
        if(MediaStreamLength === 4) return;
        VideoRecorder4 = new RecordRTC(MediaStreams[4], {
            type: 'video'
        });
        VideoRecorder4.startRecording();
        if(MediaStreamLength === 5) return;
        VideoRecorder5 = new RecordRTC(MediaStreams[5], {
            type: 'video'
        });
        VideoRecorder5.startRecording();
        if(MediaStreamLength === 6) return;
        VideoRecorder6 = new RecordRTC(MediaStreams[6], {
            type: 'video'
        });
        VideoRecorder6.startRecording();
        if(MediaStreamLength === 7) return;
        VideoRecorder7 = new RecordRTC(MediaStreams[7], {
            type: 'video'
        });
        VideoRecorder7.startRecording();
        if(MediaStreamLength === 8) return;
        VideoRecorder8 = new RecordRTC(MediaStreams[8], {
            type: 'video'
        });
        VideoRecorder8.startRecording();



        /*for (var i=0;i<MediaStreams.length;i++) {
         console.log('i :  ' + i);

         VideoRecorders[i] = new RecordRTC(MediaStreams[i], {
         type: 'video'
         });
         VideoRecorders[i].startRecording();
         //첫번째 비디오인 경우 오디오까지 같이 녹화/녹음
         //if(i === 0) {
         AudioRecorder = new RecordRTC(MediaStreams[i], {
         type: 'audio'
         });
         AudioRecorder.startRecording();
         }
         }*/
    }
    //이미 녹화중이었다면 종료한다.
    else{
        $('#Alert-space-text').append("녹화가 종료됩니다.");
        $('#Alert-space').css('-webkit-transform', 'translate(0px, 25%)');
        setTimeout(function(){
            $('#Alert-space').css('-webkit-transform', 'translate(0px, -25%)');
            $('#Alert-space-text').empty();
        },1500);
        //alert('녹화를 종료합니다.');
        $('#recordimg').css('display','none');
        recorflag = 0;

        var d = new Date();
        //녹화가 완료된 시점의 년월일시분초. RecDate 변수에 저장하여 목록 이름으로 사용할 것임.- 태양
        RecDate = d.getFullYear()+'-'+(d.getMonth() + 1)+'-'+d.getDate()+', '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        //RecDates.push(RecDate);

        //for(var i=0;i<RecDates.length; i++){
        var _li = document.createElement('li');

        // _li.textContent = RecDates[i];
        _li.textContent = RecDate;
        _li.onclick= function(){
            $('#Recorded-Video-container').css('display', 'block');
            $('#backhome').css('display', 'block');

            //$('#Recorded-Video-container').css('-webkit-transform', 'translate(2000px, 0px)');
            //$('#Wvideos').css('z-index', '-9999');
            //$('#Wvideos').css('display', 'none');
            //$('#Recorded-Video-container').css('-webkit-transform', 'translate(2000px, 0px)');
            //$('#Wvideos').css('-webkit-transform', 'translate(2000px, 0px)');
            //$('#Recorded-Video-container').css('-webkit-transform', 'translate(2000px, 0px)');



            //MediaStreamLength

            //녹화된 내용을 다시 볼때의 화면에 video들을 추가해주는 함수
            appendReviewVideos();
            //다시볼 비디오들의 크기를 알맞게 재조정.
            resizeReviewVideos();
            //자동 재생
            //$('.reviews').autoplay = true;
            //$('.reviews').load();







        };


        _li.onmouseover= function(){
            this.setAttribute('style', 'background-color:#EEEEEE');
        };
        _li.onmouseout= function(){
            this.setAttribute('style', 'background-color:#555');
        };



        $('.Recorded-list').append(_li);
        //}







        AudioRecorder.stopRecording(function() {
            var AudioLink = document.createElement('a');
            console.log('AudioRecorder.blob : ' + AudioRecorder.blob);
            AudioLink.href = window.URL.createObjectURL(AudioRecorder.blob);
            AudioLink.download = RecDate+'Audio.mp3';
            //AudioLink.click();
        });

        VideoRecorder0.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder0 : ' + VideoRecorder0.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder0.blob);
            VideoLink.download = RecDate+'video' + 0 + '.mp4';
            //VideoLink.click();


           //var file = FileReader.readAsBinaryString(VideoRecorder0.blob);
            //console.log('file : ' + file);










        });
        if(MediaStreamLength === 1) return;
        VideoRecorder1.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder1 : ' + VideoRecorder1.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder1.blob);
            VideoLink.download = RecDate+'video' + 1 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 2) return;
        VideoRecorder2.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder2 : ' + VideoRecorder2.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder2.blob);
            VideoLink.download = RecDate+'video' + 2 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 3) return;
        VideoRecorder3.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder0 : ' + VideoRecorder3.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder3.blob);
            VideoLink.download = RecDate+'video' + 3 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 4) return;
        VideoRecorder4.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder4 : ' + VideoRecorder4.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder4.blob);
            VideoLink.download = RecDate+'video' + 4 + '.mp4';
            // VideoLink.click();
        });
        if(MediaStreamLength === 5) return;
        VideoRecorder5.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder5 : ' + VideoRecorder5.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder5.blob);
            VideoLink.download = RecDate+'video' + 5 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 6) return;
        VideoRecorder6.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder6 : ' + VideoRecorder6.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder6.blob);
            VideoLink.download = RecDate+'video' + 6 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 7) return;
        VideoRecorder7.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder7 : ' + VideoRecorder7.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder7.blob);
            VideoLink.download = RecDate+'video' + 7 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 8) return;
        VideoRecorder8.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder8 : ' + VideoRecorder8.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder8.blob);
            VideoLink.download = RecDate+'video' + 8 + '.mp4';
            //VideoLink.click();
        });





        /*for (var j=0;j<MediaStreams.length;j++) {
         console.log('j :  ' + j);
         if(j !== 0){
         TmpRecorder1 = VideoRecorders[j];
         TmpRecorder1.stopRecording(function(){
         var VideoLink = document.createElement('a');
         console.log('VideoRecorders['+0+'] : ' + TmpRecorder1.blob);
         VideoLink.href = window.URL.createObjectURL(TmpRecorder1.blob);
         VideoLink.download = 'RecVRst' + 0 + '.mp4';
         VideoLink.click();
         });
         }else{
         AudioRecorder.stopRecording(function(){
         var AudioLink = document.createElement('a');
         console.log('AudioRecorder.blob : ' + AudioRecorder.blob);
         AudioLink.href = window.URL.createObjectURL(AudioRecorder.blob);
         AudioLink.download = 'RecARst.mp3';
         AudioLink.click();
         });

         TmpRecorder2 = VideoRecorders[j];
         TmpRecorder2.stopRecording(function(){
         var VideoLink = document.createElement('a');
         console.log('VideoRecorders['+1+'] : ' + TmpRecorder2.blob);
         VideoLink.href = window.URL.createObjectURL(TmpRecorder2.blob);
         VideoLink.download = 'RecVRst' + 1 + '.mp4';
         VideoLink.click();
         });
         }

         }*/
    }

});

// Recorded-Videos 공간에 다시 볼 비디오의 갯수만큼 비디오태그를 만들어서 blob url 까지 넣어서 추가해주는 함수
function appendReviewVideos(){

    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder.blob);
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder0.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 1) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder1.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 2) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder2.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 3) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder3.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 4) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder4.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 5) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder5.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 6) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder6.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 7) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder7.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 8) return;
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder8.blob);
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
/*
    for(var i=0;i<MediaStreamLength; i++){
        var video = document.createElement('video');
        video.src = window.URL.createObjectURL(VideoRecorder+i +'.blob');
        video.className = "reviews";
        video.autoplay = true;
        video.controls = true;
        $('#Recorded-Videos').append(video);
    }*/
}

function resizeReviewVideos(){
    if(MediaStreamLength == 1){
        $('.reviews').css('width','100%');
        $('.reviews').css('height','100%');
    }
    else if(MediaStreamLength == 2){
        $('.reviews').css('width','100%');
        $('.reviews').css('height','50%');
    }
    else if(MediaStreamLength == 3){
        $('.reviews').css('width','50%');
        $('.reviews').css('height','50%');
    }
    else if(MediaStreamLength == 4){
        $('.reviews').css('width','50%');
        $('.reviews').css('height','50%');
    }
    else if(MediaStreamLength == 5){
        $('.reviews').css('width','33%');
        $('.reviews').css('height','50%');
    }
    else if(MediaStreamLength == 6){
        $('.reviews').css('width','33%');
        $('.reviews').css('height','50%');
    }
    else if(MediaStreamLength == 7){
        $('.reviews').css('width','33%');
        $('.reviews').css('height','33%');
    }
    else if(MediaStreamLength == 8){
        $('.reviews').css('width','33%');
        $('.reviews').css('height','33%');
    }
    else if(MediaStreamLength == 9){
        $('.reviews').css('width','33%');
        $('.reviews').css('height','33%');
    }
}




$(document).ready(function() {
    $('#backhome').click(function () {
        $('#backhome').css('display','none');
        //$('#Wvideos').css('-webkit-transform', 'translate(-2000px, 0px)');
        //$('#Recorded-Video-container').css('-webkit-transform', 'translate(-2000px, 0px)');
        $('#Recorded-Video-container').css('display', 'none');

    });

    $('#backhome').mouseenter(function(){
        $('#backhome').css('background-color', '#999');
        });
    $('#backhome').mouseleave(function(){
        $('#backhome').css('background-color', '#222');
    });
});