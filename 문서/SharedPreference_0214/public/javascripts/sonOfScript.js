/**
 * Created by KimSangYun on 2015-02-17.
 */
var friends = [];
/*
$('#glyphicon-sharescreen').click(function(){
    var nc = new TjNetworkConnector();

    var data = {
        facebookId : '1538116369788042',
        username: 'LeeYoseob',
        accessToken: 'CAAE76xiPpRABACFZB8QZB8C40IXHWzV6CBWyKU9fhVBjBco1039JOp4rB5c2LJSiIaLptSnh8Wqz4a316UcKivF6sKgDGavu87zCVQDp3CevAmjEfeDYHWcynhwAKrUIbcX9EWkZC0ZBU5NvA5pdxAZBPfOdXGWRQHZBLIKjMSN30FDrsIZAXO1o4cZBIdMxSq7cWmpmY2ZA4lW21di3cQiyzfjNjZC4iQnTgZD'
    }
    nc.loginAndJoin( data , function(result){
        //처리 부분
        console.log('result.type : ' + result.username);
        console.log('result.url : ' + result.status);
        console.log('result.data : ' + result.facebookId);
    });


});*/


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
}

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
    var chat
    $('#glyphicon-comment').click(function(){
        //채팅창이 없었을 경우 클릭시 if문 수행
        if ($('#chatting-space').css("display") === 'none') {
            $('#chatting-space').css('display', 'block');
            $('#chatting-space').css('-webkit-transform', 'translate(570px, 0px)');
            /*$('#footer').css('margin-left', 'calc(20% + 70px)');
            $('#footer').css('width', 'calc(75% - 70px)');*/
            $('#Wvideos').css('width', 'calc(80% - 70px)');
            $('#Wvideos').css('margin-left', 'calc(20% + 70px)');
            $('#Recorded-Video-container').css('width', 'calc(80% - 70px)');
            $('#Recorded-Video-container').css('margin-left', 'calc(20% + 70px)');
        }
        //채팅창이 있었을 경우 클릭시 else문 수행
        else {
            $('#Wvideos').css('margin-left', '70px');
            $('#Wvideos').css('width', 'calc(100% - 70px)');
            $('#Recorded-Video-container').css('margin-left', '70px');
            $('#Recorded-Video-container').css('width', 'calc(100% - 70px)');
            $('#chatting-space').css('-webkit-transform', 'translate(-570px, 0px)');
            //$('#chatting-space').slideToggle('slow');

            /*setTimeout(function(){
                $('#footer').css('margin-left', '70px');
                $('#footer').css('width', '95%');
            },500);*/
            $('#chatting-space').css('display', 'none');
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
            $('#Recorded-Video-container').css('width', 'calc(80% - 70px)');
            $('#Recorded-Video-container').css('margin-left', 'calc(20% + 70px)');

        }
        //녹화리스트가 화면에  있었을 경우 클릭시 else문 수행
        else {
            $('#Wvideos').css('margin-left', '70px');
            $('#Wvideos').css('width', 'calc(100% - 70px)');
            $('#Recorded-Video-container').css('margin-left', '70px');
            $('#Recorded-Video-container').css('width', 'calc(100% - 70px)');
            $('#Recorded-List-container').css('-webkit-transform', 'translate(-570px, 0px)');
            $('#Recorded-List-container').css('display', 'none');

        }
    });
});

function initFriendsList(){

    function Friend(id, name, imgurl) {
        this.id = id;
        this.name = name;
        this.imgurl = imgurl;
    }

    var dummy1 = new Friend('54de1ab66e8eb71f3ef2151f1','송태양','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy2 = new Friend('54de1ab66e8eb71f3ef2151f2','이요섭','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy3 = new Friend('54de1ab66e8eb71f3ef2151f3','유광열','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy4 = new Friend('54de1ab66e8eb71f3ef2151f4','남두현','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy5 = new Friend('54de1ab66e8eb71f3ef2151f5','정재현','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy6 = new Friend('54de1ab66e8eb71f3ef2151f6','김수지','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy7 = new Friend('54de1ab66e8eb71f3ef2151f7','박태현','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy8 = new Friend('54de1ab66e8eb71f3ef2151f8','임용규','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy9 = new Friend('54de1ab66e8eb71f3ef2151f9','윤필립','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy10 = new Friend('54de1ab66e8eb71f3ef2151f0','손승하','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy11 = new Friend('54de1ab66e8eb71f3ef2151f11','손진오','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy12 = new Friend('54de1ab66e8eb71f3ef2151f12','김민수','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy13 = new Friend('54de1ab66e8eb71f3ef2151f13','김상윤','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy14 = new Friend('54de1ab66e8eb71f3ef2151f14','김은민','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy15 = new Friend('54de1ab66e8eb71f3ef2151f15','권용훈','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy16 = new Friend('54de1ab66e8eb71f3ef2151f16','이정우','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy17 = new Friend('54de1ab66e8eb71f3ef2151f17','이정훈','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy18 = new Friend('54de1ab66e8eb71f3ef2151f18','최한솔','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy19 = new Friend('54de1ab66e8eb71f3ef2151f19','이세리','http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy20 = new Friend('54de1ab66e8eb71f3ef2151f20','임송묵','http://playchalk.com/media/image/accounts/default_profile_img.jpg');

    friends.push(dummy1);friends.push(dummy2);friends.push(dummy3);friends.push(dummy4);friends.push(dummy5);
    friends.push(dummy6);friends.push(dummy7);friends.push(dummy8);friends.push(dummy9);friends.push(dummy10);
    friends.push(dummy11);friends.push(dummy12);friends.push(dummy13);friends.push(dummy14);friends.push(dummy15);
    friends.push(dummy16);friends.push(dummy17);friends.push(dummy18);friends.push(dummy19);friends.push(dummy20);


    for(var i=0;i<friends.length; i++){
        var li_ = document.createElement('li');
        var img_ = document.createElement('img');

        li_.id = friends[i].id;
        li_.textContent = friends[i].name;
        img_.className = "profileimgs";
        img_.src = friends[i].imgurl;

        li_.appendChild(img_);

        li_.onclick= function(){
            alert('ID: '+this.id+"\n이름: "+this.textContent+".");
        };
        li_.onmouseover= function(){
            this.setAttribute('style', 'background-color:#999');
        };
        li_.onmouseout= function(){
            this.setAttribute('style', 'background-color:#383838');
        };
        $('.sidebar-friends').append(li_);
    }
};



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
        alert('녹화를 시작합니다.');
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
        return;


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
        alert('녹화를 종료합니다.');
        $('#recordimg').css('display','none');
        recorflag = 0;

        var d = new Date();
        var RecDate;
        //녹화가 완료된 시점의 년월일시분초. RecDate 변수에 저장하여 목록 이름으로 사용할 것임.- 태양
        RecDate = d.getFullYear()+'-'+(d.getMonth() + 1)+'-'+d.getDate()+', '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        //RecDates.push(RecDate);

        //for(var i=0;i<RecDates.length; i++){
        var _li = document.createElement('li');

        // _li.textContent = RecDates[i];
        _li.textContent = RecDate;
        /*_li.onclick= function(){


            //alert('ID: '+this.id+"\n이름: "+this.textContent+".");
            //$('#Wvideos').css('display','none');


        };*/


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
            AudioLink.download = 'RecARst.mp3';
            //AudioLink.click();
        });

        VideoRecorder0.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder0 : ' + VideoRecorder0.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder0.blob);
            VideoLink.download = 'RecVRst' + 0 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 1) return;
        VideoRecorder1.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder1 : ' + VideoRecorder1.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder1.blob);
            VideoLink.download = 'RecVRst' + 1 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 2) return;
        VideoRecorder2.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder2 : ' + VideoRecorder2.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder2.blob);
            VideoLink.download = 'RecVRst' + 2 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 3) return;
        VideoRecorder3.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder0 : ' + VideoRecorder3.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder3.blob);
            VideoLink.download = 'RecVRst' + 3 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 4) return;
        VideoRecorder4.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder4 : ' + VideoRecorder4.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder4.blob);
            VideoLink.download = 'RecVRst' + 4 + '.mp4';
            // VideoLink.click();
        });
        if(MediaStreamLength === 5) return;
        VideoRecorder5.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder5 : ' + VideoRecorder5.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder5.blob);
            VideoLink.download = 'RecVRst' + 5 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 6) return;
        VideoRecorder6.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder6 : ' + VideoRecorder6.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder6.blob);
            VideoLink.download = 'RecVRst' + 6 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 7) return;
        VideoRecorder7.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder7 : ' + VideoRecorder7.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder7.blob);
            VideoLink.download = 'RecVRst' + 7 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 8) return;
        VideoRecorder8.stopRecording(function(){
            var VideoLink = document.createElement('a');
            console.log('VideoRecorder8 : ' + VideoRecorder8.blob);
            VideoLink.href = window.URL.createObjectURL(VideoRecorder8.blob);
            VideoLink.download = 'RecVRst' + 8 + '.mp4';
            //VideoLink.click();
        });
        return;




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
