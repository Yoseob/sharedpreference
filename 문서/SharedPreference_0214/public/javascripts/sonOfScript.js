/**
 * Created by KimSangYun on 2015-02-17.
 */
var RecDate;
var Friends = [];
var userInfo = new DefaultUserinfo();


//화면크기 조절을 감지하여 footer의 높이를 조절해주는 함수
window.onresize = function resizeFooterHeight() {
    var ClientWidth = document.body.clientWidth;
    var ClientHeight = document.body.clientHeight;
// 화면의 넓이가 높이보다 좁아지면 (화면이 세로로 길어지면)
    /*if(ClientWidth < ClientHeight){
        $('#footer').css('height',ClientWidth/4 + 'px');
    }else{
        $('#footer').css('height',ClientHeight/4+'px');
    }*/

    //모바일인지 아닌지 체크
   if(ClientWidth <= '400'){
        $('#sidebar-wrapper').css('left','-250px');
        $('#sidebar-wrapper').css('display','none');
        $('#bottombar-wrapper').css('display','block');
        $('#bottombar-wrapper').css('bottom','0px');
        setTimeout(function(){
            $('#footer').css('height',ClientWidth/4 + 'px');
            $('#footer').css('width','95%');
            $('#footer').css('margin-left','5%');
            $('#footer').css('bottom','50px');
            $('#Wvideos').css('height','calc(100% - 50px)');
            $('#Wvideos').css('width','100%');
            $('#Wvideos').css('margin-left','0');
            $('#Recorded-Video-container').css('width', '100%');
            $('#Recorded-Video-container').css('margin-left','0');
            $('#Recorded-Video-container').css('bottom', '50px');

            $('#chatting-space').css('left', '-500px');
            $('#chatting-space').css('display', 'none');
            $('#Recorded-List-container').css('left', '-500px');
            $('#Recorded-List-container').css('display', 'none');
            $('#backhome').css('bottom', '50px');
            $('#backhome').css('height', '7%');
            $('#backhome').css('width', '7%');
            $('#Alert-space-text').css('font-size', '10%');
            $('#recordimg').css('height', '10%');
            $('#recordimg').css('width', '10%');
        },400);
    }else{
        $('#footer').css('height',ClientHeight/4+'px');
        $('#footer').css('bottom','0px');
        $('#footer').css('width','calc(95% - 70px)');
        $('#footer').css('margin-left','calc(5% + 70px)');
        $('#footer').css('margin-bottom','0px');
        $('#Wvideos').css('height','100%');
        $('#Wvideos').css('width','calc(100% - 70px)');
        $('#Wvideos').css('margin-left','70px');
       $('#Wvideos').css('margin-bottom','0px');
        $('#Recorded-Video-container').css('width', 'calc(100% - 70px)');
        $('#Recorded-Video-container').css('height', '100%');
        $('#Recorded-Video-container').css('margin-left','70px');
        $('#Recorded-Video-container').css('bottom', '0');
        $('#chatting-space2').css('bottom', '-550px');
        $('#chatting-space2').css('display', 'none');
        $('#Recorded-List-container2').css('bottom', '-550px');
        $('#Recorded-List-container2').css('display', 'none');
        $('#sidebar-friends-list2').css('left', '-300px');
        $('#sidebar-friends-list2').css('display', 'none');
        $('#backhome').css('bottom', '0px');
        $('#backhome').css('height', '5%');
        $('#backhome').css('width', '5%');
        $('#Alert-space-text').css('font-size', '100%');
        $('#recordimg').css('height', '3%');
        $('#recordimg').css('width', '3%');
        setTimeout(function(){
            $('#sidebar-wrapper').css('display','block');
            $('#sidebar-wrapper').css('left','-130px');
            $('#bottombar-wrapper').css('bottom','-100px');
            $('#bottombar-wrapper').css('display','none');
        },300);

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

//모바일버전에서 친구리스트 뜨게하는 부분 - 태양
$(document).ready(function() {
    $('#glyphicon-friends').click(function(){
        if ($('#sidebar-friends-list2').css("display") === 'none') {
            $('#sidebar-friends-list2').css('left', '0');
            $('#sidebar-friends-list2').css('display', 'block');
        }
        //친구리스트이 있었을 경우 클릭시 else문 수행
        else {
            $('#sidebar-friends-list2').css('left', '-300px');
            $('#sidebar-friends-list2').css('display', 'none');
        }

    });

});

//채팅 버튼 눌렀을 때 채팅창 뜨게 하는 함수  - 태양
$(document).ready(function(){
    var chat;
    $('#glyphicon-comment').click(function(){
        $('#sidebar-wrapper').css('-webkit-transform', 'translate(-0px,0px)');
        //채팅창이 없었을 경우 클릭시 if문 수행
        if ($('#chatting-space').css("display") === 'none') {
            if ($('#Recorded-List-container').css('display') === 'block') {
                $('#Recorded-List-container').css('-webkit-transform', 'translate(-570px, 0px)');
                $('#Recorded-List-container').css('display', 'none');
            }
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

    $('#glyphicon-comment2').click(function(){
        //채팅창이 없었을 경우 클릭시 if문 수행
        if ($('#chatting-space2').css("display") === 'none') {
            if ($('#Recorded-List-container2').css('display') === 'block') {
                $('#Recorded-List-container2').css('bottom', '-550px');
                $('#Recorded-List-container2').css('display', 'none');
            }
            $('#chatting-space2').css('display', 'block');
            $('#chatting-space2').css('bottom', '50px');
            //$('#chatting-space2').css('-webkit-transform', 'translate(0px, -550px)');

            $('#footer').css('bottom', 'calc(30% + 50px');
            $('#footer').css('margin-bottom', '0');
            $('#Wvideos').css('height', 'calc(70% - 50px)');
            $('#Wvideos').css('margin-bottom', 'calc(30% + 50px)');

            $('#Recorded-Video-container').css('height', 'calc(70% - 50px)');
            $('#Recorded-Video-container').css('bottom', 'calc(30% + 50px)');
            $('#backhome').css('bottom', 'calc(30% + 50px)');
        }
        //채팅창이 있었을 경우 클릭시 else문 수행
        else {
            $('#footer').css('bottom', '50px');
            $('#Wvideos').css('height', 'calc(100% - 50px)');
            $('#Wvideos').css('margin-bottom', '50px');
            $('#chatting-space2').css('bottom', '-550px');
            $('#chatting-space2').css('display', 'none');
            $('#Recorded-Video-container').css('height', 'calc(100% - 50px)');
            $('#Recorded-Video-container').css('bottom', '50px');
            $('#backhome').css('bottom', '50px');
        }
    });
});

//녹화목록보기 버튼 눌렀을 때 목록 뜨게 하는 함수  - 태양
$(document).ready(function(){
    $('#glyphicon-repeat').click(function(){
        //녹화리스트가 화면에 없었을 경우 클릭시 if문 수행
        if ($('#Recorded-List-container').css('display') === 'none') {
            $('#sidebar-wrapper').css('-webkit-transform', 'translate(-0px,0px)');
            if($('#chatting-space').css("display") === 'block'){
                $('#chatting-space').css('-webkit-transform', 'translate(-570px, 0px)');
                $('#chatting-space').css('display', 'none');
            }
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

            setTimeout(function(){
                $('#Recorded-List-container').css('-webkit-transform', 'translate(-570px, 0px)');
                $('#Recorded-List-container').css('display', 'none');
             },200);


        }
    });

    $('#glyphicon-repeat2').click(function(){
        //녹화리스트가 화면에 없었을 경우 클릭시 if문 수행
        if ($('#Recorded-List-container2').css('display') === 'none') {
            if($('#chatting-space2').css("display") === 'block'){
                $('#chatting-space2').css('bottom', '-550px');
                $('#chatting-space2').css('display', 'none');
            }
            $('#Recorded-List-container2').css('display', 'block');
            $('#Recorded-List-container2').css('bottom', '50px');


            $('#footer').css('bottom', 'calc(30% + 50px');
            $('#footer').css('margin-bottom', '0');
            $('#Wvideos').css('height', 'calc(70% - 50px)');
            $('#Wvideos').css('margin-bottom', 'calc(30% + 50px)');
            $('#Recorded-Video-container').css('height', 'calc(70% - 50px)');
            $('#Recorded-Video-container').css('bottom', 'calc(30% + 50px)');
            $('#backhome').css('bottom', 'calc(30% + 50px)');
        }
        //녹화리스트가 화면에  있었을 경우 클릭시 else문 수행
        else {
            $('#footer').css('bottom', '50px');
            $('#Wvideos').css('height', 'calc(100% - 50px)');
            $('#Wvideos').css('margin-bottom', '50px');
            $('#Wvideos').css('margin-bottom', '50px');
            $('#Recorded-Video-container').css('height', 'calc(100% - 50px)');
            $('#Recorded-Video-container').css('bottom', '50px');
            $('#backhome').css('bottom', '50px');
            //$('#Recorded-Video-container').css('margin-left', '70px');
            //$('#Recorded-Video-container').css('width', 'calc(100% - 70px)');

            setTimeout(function(){
                $('#Recorded-List-container2').css('bottom', '-550px');
                $('#Recorded-List-container2').css('display', 'none');
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
    var data = result.data;
    Friends = data.friendlist;


    for(var i=0;i<Friends.length; i++){
        var li_ = document.createElement('li');
        var img_ = document.createElement('img');
        var p_ = document.createElement('p');


        li_.id = Friends[i].id;
        p_.textContent = Friends[i].name;
        img_.className = "profileimgs";
        img_.src = Friends[i].url;

        li_.appendChild(p_);
        li_.appendChild(img_);

        li_.onclick = function(){
            //$('#select-space-contents').empty();
            //$('#select-space').css('display','block');
            //$('#select-space-contents').append($(this).find('p').text()+'님의 방으로 이동 하시겠습니까?');
                var selectedName = $(this).find('p').text();
            if (confirm(selectedName+'님의 방으로 이동 하시겠습니까?') === true){    //확인
                var id_ = userInfo.getUserId();
                var nc = new TjNetworkConnector();
                nc.checkTheRoomExist({owner_id:selectedName}, function(result){
                    console.log('result : ');
                    console.log(result);
                    console.log('result.data.state : ');
                    var data_ = result.data;
                    console.log(data_.state);


                    if(data_.state === 'active'){
                        userInfo.setTargetUser(selectedName);
                        //location.href = 'http://210.118.64.172:8000';
                        location.href = 'tjchat.com';
                    }else {
                        alert(selectedName+'님의 방이 존재하지 않아서 입장이 불가합니다.');
                    }
                });

            }else{   //취소
            }
        };
        li_.onmouseover= function(){
            this.setAttribute('style', 'background-color:#AAA');
        };
        li_.onmouseout= function(){
            this.setAttribute('style', 'background-color:#252525');
        };

        var _li = li_.cloneNode(true);

        _li.onclick = function(){
            //$('#select-space-contents').empty();
            //$('#select-space').css('display','block');
            //$('#select-space-contents').append($(this).find('p').text()+'님의 방으로 이동 하시겠습니까?');
            var selectedName = $(this).find('p').text();
            if (confirm(selectedName+'님의 방으로 이동 하시겠습니까?') === true){    //확인
                var id_ = userInfo.getUserId();
                var nc = new TjNetworkConnector();
                nc.checkTheRoomExist({owner_id:selectedName}, function(result){
                    console.log('result : ');
                    console.log(result);
                    console.log('result.data.state : ');
                    var data_ = result.data;
                    console.log(data_.state);


                    if(data_.state === 'active'){
                        userInfo.setTargetUser(selectedName);
                        location.href = 'http://210.118.64.172:8000';
                    }else {
                        alert(selectedName+'님의 방이 존재하지 않아서 입장이 불가합니다.');
                    }
                });

            }else{   //취소
            }
        };
        _li.onmouseover= function(){
            this.setAttribute('style', 'background-color:#AAA');
        };
        _li.onmouseout= function(){
            this.setAttribute('style', 'background-color:#252525');
        };


        $('.sidebar-friends').append(li_);
        $('.sidebar-friends2').append(_li);
    }
}


var recorflag = 0;
var MediaStreams = [];
var MediaStreamLength=0;
var AudioRecorder0;
var AudioRecorder1;
var AudioRecorder2;
var AudioRecorder3;
var AudioRecorder4;
var AudioRecorder5;
var AudioRecorder6;
var AudioRecorder7;
var AudioRecorder8;
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

        AudioRecorder0 = new RecordRTC(MediaStreams[0], {
            type: 'audio'
        });
        AudioRecorder0.startRecording();
        VideoRecorder0 = new RecordRTC(MediaStreams[0], {
            type: 'video'
        });
        VideoRecorder0.startRecording();
        if(MediaStreamLength === 1) return;
        AudioRecorder1 = new RecordRTC(MediaStreams[1], {
            type: 'audio'
        });
        AudioRecorder1.startRecording();
        VideoRecorder1 = new RecordRTC(MediaStreams[1], {
            type: 'video'
        });
        VideoRecorder1.startRecording();
        if(MediaStreamLength === 2) return;
        AudioRecorder2 = new RecordRTC(MediaStreams[2], {
            type: 'audio'
        });
        AudioRecorder2.startRecording();
        VideoRecorder2 = new RecordRTC(MediaStreams[2], {
            type: 'video'
        });
        VideoRecorder2.startRecording();
        if(MediaStreamLength === 3) return;
        AudioRecorder3 = new RecordRTC(MediaStreams[3], {
            type: 'audio'
        });
        AudioRecorder3.startRecording();
        VideoRecorder3 = new RecordRTC(MediaStreams[3], {
            type: 'video'
        });
        VideoRecorder3.startRecording();
        if(MediaStreamLength === 4) return;
        AudioRecorder4 = new RecordRTC(MediaStreams[4], {
            type: 'audio'
        });
        AudioRecorder4.startRecording();
        VideoRecorder4 = new RecordRTC(MediaStreams[4], {
            type: 'video'
        });
        VideoRecorder4.startRecording();
        if(MediaStreamLength === 5) return;
        AudioRecorder5 = new RecordRTC(MediaStreams[5], {
            type: 'audio'
        });
        AudioRecorder5.startRecording();
        VideoRecorder5 = new RecordRTC(MediaStreams[5], {
            type: 'video'
        });
        VideoRecorder5.startRecording();
        if(MediaStreamLength === 6) return;
        AudioRecorder6 = new RecordRTC(MediaStreams[6], {
            type: 'audio'
        });
        AudioRecorder6.startRecording();
        VideoRecorder6 = new RecordRTC(MediaStreams[6], {
            type: 'video'
        });
        VideoRecorder6.startRecording();
        if(MediaStreamLength === 7) return;
        AudioRecorder7 = new RecordRTC(MediaStreams[7], {
            type: 'audio'
        });
        AudioRecorder7.startRecording();
        VideoRecorder7 = new RecordRTC(MediaStreams[7], {
            type: 'video'
        });
        VideoRecorder7.startRecording();
        if(MediaStreamLength === 8) return;
        AudioRecorder8 = new RecordRTC(MediaStreams[8], {
            type: 'audio'
        });
        AudioRecorder8.startRecording();
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
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var p3 = document.createElement('p');

        // _li.textContent = RecDates[i];
        p2.textContent = RecDate;

        _li.appendChild(p1);
        _li.appendChild(p2);
        _li.appendChild(p3);

        _li.onclick= function(){
            $('#Recorded-Video-container').css('display', 'block');
            $('#backhome').css('display', 'block');

            //녹화된 내용을 다시 볼때의 화면에 video들을 추가해주는 함수
            appendReviewVideos();
            //다시볼 비디오들의 크기를 알맞게 재조정.
            resizeReviewVideos();
        };


        _li.onmouseover= function(){
            this.setAttribute('style', 'background-color:#AAA');
        };
        _li.onmouseout= function(){
            this.setAttribute('style', 'background-color:#383838');
        };

        var li_ = _li.cloneNode(true);

        li_.onclick= function(){
            $('#Recorded-Video-container').css('display', 'block');
            $('#backhome').css('display', 'block');

            //녹화된 내용을 다시 볼때의 화면에 video들을 추가해주는 함수
            appendReviewVideos();
            //다시볼 비디오들의 크기를 알맞게 재조정.
            resizeReviewVideos();
        };
        li_.onmouseover= function(){
            this.setAttribute('style', 'background-color:#AAA');
        };
        li_.onmouseout= function(){
            this.setAttribute('style', 'background-color:#383838');
        };
        $('.Recorded-list').append(_li);
        $('.Recorded-list2').append(li_);
        //}







        AudioRecorder0.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder0.blob);
            AudioLink.download = RecDate+'audio' + 0 +'.mp3';
            //AudioLink.click();
        });

        VideoRecorder0.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder0.blob);
            VideoLink.download = RecDate+'video' + 0 + '.mp4';
            //VideoLink.click();


           //var file = FileReader.readAsBinaryString(VideoRecorder0.blob);
            //console.log('file : ' + file);

        });
        if(MediaStreamLength === 1) return;
        AudioRecorder1.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder1.blob);
            AudioLink.download = RecDate+'audio' + 1 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder1.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder1.blob);
            VideoLink.download = RecDate+'video' + 1 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 2) return;
        AudioRecorder2.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder2.blob);
            AudioLink.download = RecDate+'audio' + 2 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder2.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder2.blob);
            VideoLink.download = RecDate+'video' + 2 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 3) return;
        AudioRecorder3.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder3.blob);
            AudioLink.download = RecDate+'audio' + 3 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder3.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder3.blob);
            VideoLink.download = RecDate+'video' + 3 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 4) return;
        AudioRecorder4.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder4.blob);
            AudioLink.download = RecDate+'audio' + 4 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder4.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder4.blob);
            VideoLink.download = RecDate+'video' + 4 + '.mp4';
            // VideoLink.click();
        });
        if(MediaStreamLength === 5) return;
        AudioRecorder5.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder5.blob);
            AudioLink.download = RecDate+'audio' + 5 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder5.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder5.blob);
            VideoLink.download = RecDate+'video' + 5 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 6) return;
        AudioRecorder6.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder6.blob);
            AudioLink.download = RecDate+'audio' + 6 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder6.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder6.blob);
            VideoLink.download = RecDate+'video' + 6 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 7) return;
        AudioRecorder7.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder7.blob);
            AudioLink.download = RecDate+'audio' + 7 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder7.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder7.blob);
            VideoLink.download = RecDate+'video' + 7 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 8) return;
        AudioRecorder8.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder8.blob);
            AudioLink.download = RecDate+'audio' + 8 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder8.stopRecording(function(){
            var VideoLink = document.createElement('a');
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

$('#glyphicon-record2').click(function() {
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

        AudioRecorder0 = new RecordRTC(MediaStreams[0], {
            type: 'audio'
        });
        AudioRecorder0.startRecording();
        VideoRecorder0 = new RecordRTC(MediaStreams[0], {
            type: 'video'
        });
        VideoRecorder0.startRecording();
        if(MediaStreamLength === 1) return;
        AudioRecorder1 = new RecordRTC(MediaStreams[1], {
            type: 'audio'
        });
        AudioRecorder1.startRecording();
        VideoRecorder1 = new RecordRTC(MediaStreams[1], {
            type: 'video'
        });
        VideoRecorder1.startRecording();
        if(MediaStreamLength === 2) return;
        AudioRecorder2 = new RecordRTC(MediaStreams[2], {
            type: 'audio'
        });
        AudioRecorder2.startRecording();
        VideoRecorder2 = new RecordRTC(MediaStreams[2], {
            type: 'video'
        });
        VideoRecorder2.startRecording();
        if(MediaStreamLength === 3) return;
        AudioRecorder3 = new RecordRTC(MediaStreams[3], {
            type: 'audio'
        });
        AudioRecorder3.startRecording();
        VideoRecorder3 = new RecordRTC(MediaStreams[3], {
            type: 'video'
        });
        VideoRecorder3.startRecording();
        if(MediaStreamLength === 4) return;
        AudioRecorder4 = new RecordRTC(MediaStreams[4], {
            type: 'audio'
        });
        AudioRecorder4.startRecording();
        VideoRecorder4 = new RecordRTC(MediaStreams[4], {
            type: 'video'
        });
        VideoRecorder4.startRecording();
        if(MediaStreamLength === 5) return;
        AudioRecorder5 = new RecordRTC(MediaStreams[5], {
            type: 'audio'
        });
        AudioRecorder5.startRecording();
        VideoRecorder5 = new RecordRTC(MediaStreams[5], {
            type: 'video'
        });
        VideoRecorder5.startRecording();
        if(MediaStreamLength === 6) return;
        AudioRecorder6 = new RecordRTC(MediaStreams[6], {
            type: 'audio'
        });
        AudioRecorder6.startRecording();
        VideoRecorder6 = new RecordRTC(MediaStreams[6], {
            type: 'video'
        });
        VideoRecorder6.startRecording();
        if(MediaStreamLength === 7) return;
        AudioRecorder7 = new RecordRTC(MediaStreams[7], {
            type: 'audio'
        });
        AudioRecorder7.startRecording();
        VideoRecorder7 = new RecordRTC(MediaStreams[7], {
            type: 'video'
        });
        VideoRecorder7.startRecording();
        if(MediaStreamLength === 8) return;
        AudioRecorder8 = new RecordRTC(MediaStreams[8], {
            type: 'audio'
        });
        AudioRecorder8.startRecording();
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
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var p3 = document.createElement('p');

        // _li.textContent = RecDates[i];
        p2.textContent = RecDate;

        _li.appendChild(p1);
        _li.appendChild(p2);
        _li.appendChild(p3);

        _li.onclick= function(){
            $('#Recorded-Video-container').css('display', 'block');
            $('#backhome').css('display', 'block');


            //녹화된 내용을 다시 볼때의 화면에 video들을 추가해주는 함수
            appendReviewVideos();
            //다시볼 비디오들의 크기를 알맞게 재조정.
            resizeReviewVideos();


            /*
             var exec = require('child_process').exec, child;
             child = exec('/usr/bin/java -jar C:/Users/KimSangYun/Desktop/KomoranOfSunModule',
             function (error, stdout, stderr){
             console.log('stdout: ' + stdout);
             console.log('stderr: ' + stderr);
             if(error !== null){
             console.log('exec error: ' + error);
             }
             });
             */






        };


        _li.onmouseover= function(){
            this.setAttribute('style', 'background-color:#AAA');
        };
        _li.onmouseout= function(){
            this.setAttribute('style', 'background-color:#383838');
        };

        var li_ = _li.cloneNode(true);

        li_.onclick= function(){
            $('#Recorded-Video-container').css('display', 'block');
            $('#backhome').css('display', 'block');

            //녹화된 내용을 다시 볼때의 화면에 video들을 추가해주는 함수
            appendReviewVideos();
            //다시볼 비디오들의 크기를 알맞게 재조정.
            resizeReviewVideos();
        };
        li_.onmouseover= function(){
            this.setAttribute('style', 'background-color:#AAA');
        };
        li_.onmouseout= function(){
            this.setAttribute('style', 'background-color:#383838');
        };
        $('.Recorded-list').append(_li);
        $('.Recorded-list2').append(li_);
        //}







        AudioRecorder0.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder0.blob);
            AudioLink.download = RecDate+'audio' + 0 +'.mp3';
            //AudioLink.click();
        });

        VideoRecorder0.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder0.blob);
            VideoLink.download = RecDate+'video' + 0 + '.mp4';
            //VideoLink.click();


            //var file = FileReader.readAsBinaryString(VideoRecorder0.blob);
            //console.log('file : ' + file);

        });
        if(MediaStreamLength === 1) return;
        AudioRecorder1.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder1.blob);
            AudioLink.download = RecDate+'audio' + 1 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder1.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder1.blob);
            VideoLink.download = RecDate+'video' + 1 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 2) return;
        AudioRecorder2.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder2.blob);
            AudioLink.download = RecDate+'audio' + 2 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder2.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder2.blob);
            VideoLink.download = RecDate+'video' + 2 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 3) return;
        AudioRecorder3.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder3.blob);
            AudioLink.download = RecDate+'audio' + 3 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder3.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder3.blob);
            VideoLink.download = RecDate+'video' + 3 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 4) return;
        AudioRecorder4.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder4.blob);
            AudioLink.download = RecDate+'audio' + 4 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder4.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder4.blob);
            VideoLink.download = RecDate+'video' + 4 + '.mp4';
            // VideoLink.click();
        });
        if(MediaStreamLength === 5) return;
        AudioRecorder5.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder5.blob);
            AudioLink.download = RecDate+'audio' + 5 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder5.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder5.blob);
            VideoLink.download = RecDate+'video' + 5 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 6) return;
        AudioRecorder6.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder6.blob);
            AudioLink.download = RecDate+'audio' + 6 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder6.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder6.blob);
            VideoLink.download = RecDate+'video' + 6 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 7) return;
        AudioRecorder7.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder7.blob);
            AudioLink.download = RecDate+'audio' + 7 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder7.stopRecording(function(){
            var VideoLink = document.createElement('a');
            VideoLink.href = window.URL.createObjectURL(VideoRecorder7.blob);
            VideoLink.download = RecDate+'video' + 7 + '.mp4';
            //VideoLink.click();
        });
        if(MediaStreamLength === 8) return;
        AudioRecorder8.stopRecording(function() {
            var AudioLink = document.createElement('a');
            AudioLink.href = window.URL.createObjectURL(AudioRecorder8.blob);
            AudioLink.download = RecDate+'audio' + 8 +'.mp3';
            //AudioLink.click();
        });
        VideoRecorder8.stopRecording(function(){
            var VideoLink = document.createElement('a');
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

function resetReview(){
    /*var icon = document.getElementById("playorstop");
    icon.className = 'glyphicon glyphicon-pause';
*/
    var aid0 = document.getElementById('reviews-audio0');
    var vid0 = document.getElementById('reviews-video0');
    aid0.currentTime = 0;
    vid0.currentTime = 0;
    if(MediaStreamLength === 1) return;
    var aid1 = document.getElementById('reviews-audio1');
    var vid1 = document.getElementById('reviews-video1');
    aid1.currentTime = 0;
    vid1.currentTime = 0;
    if(MediaStreamLength === 2) return;
    var aid2 = document.getElementById('reviews-audio2');
    var vid2 = document.getElementById('reviews-video2');
    aid2.currentTime = 0;
    vid2.currentTime = 0;
    if(MediaStreamLength === 3) return;
    var aid3 = document.getElementById('reviews-audio3');
    var vid3 = document.getElementById('reviews-video3');
    aid3.currentTime = 0;
    vid3.currentTime = 0;
    if(MediaStreamLength === 4) return;
    var aid4 = document.getElementById('reviews-audio4');
    var vid4 = document.getElementById('reviews-video4');
    aid4.currentTime = 0;
    vid4.currentTime = 0;
    if(MediaStreamLength === 5) return;
    var aid5 = document.getElementById('reviews-audio5');
    var vid5 = document.getElementById('reviews-video5');
    aid5.currentTime = 0;
    vid5.currentTime = 0;
    if(MediaStreamLength === 6) return;
    var aid6 = document.getElementById('reviews-audio6');
    var vid6 = document.getElementById('reviews-video6');
    aid6.currentTime = 0;
    vid6.currentTime = 0;
    if(MediaStreamLength === 7) return;
    var aid7 = document.getElementById('reviews-audio7');
    var vid7 = document.getElementById('reviews-video7');
    aid7.currentTime = 0;
    vid7.currentTime = 0;
    if(MediaStreamLength === 8) return;
    var aid8 = document.getElementById('reviews-audio8');
    var vid8 = document.getElementById('reviews-video8');
    aid8.currentTime = 0;
    vid8.currentTime = 0;
}

function skipBackReview(){
    /*var icon = document.getElementById("playorstop");
    icon.className = 'glyphicon glyphicon-pause';*/

    var aid0 = document.getElementById('reviews-audio0');
    var vid0 = document.getElementById('reviews-video0');
    aid0.currentTime -= 10;
    vid0.currentTime -= 10;
    if(MediaStreamLength === 1) return;
    var aid1 = document.getElementById('reviews-audio1');
    var vid1 = document.getElementById('reviews-video1');
    aid1.currentTime -= 10;
    vid1.currentTime -= 10;
    if(MediaStreamLength === 2) return;
    var aid2 = document.getElementById('reviews-audio2');
    var vid2 = document.getElementById('reviews-video2');
    aid2.currentTime -= 10;
    vid2.currentTime -= 10;
    if(MediaStreamLength === 3) return;
    var aid3 = document.getElementById('reviews-audio3');
    var vid3 = document.getElementById('reviews-video3');
    aid3.currentTime -= 10;
    vid3.currentTime -= 10;
    if(MediaStreamLength === 4) return;
    var aid4 = document.getElementById('reviews-audio4');
    var vid4 = document.getElementById('reviews-video4');
    aid4.currentTime -= 10;
    vid4.currentTime -= 10;
    if(MediaStreamLength === 5) return;
    var aid5 = document.getElementById('reviews-audio5');
    var vid5 = document.getElementById('reviews-video5');
    aid5.currentTime -= 10;
    vid5.currentTime -= 10;
    if(MediaStreamLength === 6) return;
    var aid6 = document.getElementById('reviews-audio6');
    var vid6 = document.getElementById('reviews-video6');
    aid6.currentTime -= 10;
    vid6.currentTime -= 10;
    if(MediaStreamLength === 7) return;
    var aid7 = document.getElementById('reviews-audio7');
    var vid7 = document.getElementById('reviews-video7');
    aid7.currentTime -= 10;
    vid7.currentTime -= 10;
    if(MediaStreamLength === 8) return;
    var aid8 = document.getElementById('reviews-audio8');
    var vid8 = document.getElementById('reviews-video8');
    aid8.currentTime -= 10;
    vid8.currentTime -= 10;
}
function playorstopReview() {
    var aid0 = document.getElementById('reviews-audio0');
    var vid0 = document.getElementById('reviews-video0');
    if (vid0.paused === true) {
        var icon = document.getElementById("playorstop");
        icon.className = 'glyphicon glyphicon-pause';
        aid0.play();
        vid0.play();
        if(MediaStreamLength === 1) return;
        var aid1 = document.getElementById('reviews-audio1');
        var vid1 = document.getElementById('reviews-video1');
        aid1.play();
        vid1.play();
        if(MediaStreamLength === 2) return;
        var aid2 = document.getElementById('reviews-audio2');
        var vid2 = document.getElementById('reviews-video2');
        aid2.play();
        vid2.play();
        if(MediaStreamLength === 3) return;
        var aid3 = document.getElementById('reviews-audio3');
        var vid3 = document.getElementById('reviews-video3');
        aid3.play();
        vid3.play();
        if(MediaStreamLength === 4) return;
        var aid4 = document.getElementById('reviews-audio4');
        var vid4 = document.getElementById('reviews-video4');
        aid4.play();
        vid4.play();
        if(MediaStreamLength === 5) return;
        var aid5 = document.getElementById('reviews-audio5');
        var vid5 = document.getElementById('reviews-video5');
        aid5.play();
        vid5.play();
        if(MediaStreamLength === 6) return;
        var aid6 = document.getElementById('reviews-audio6');
        var vid6 = document.getElementById('reviews-video6');
        aid6.play();
        vid6.play();
        if(MediaStreamLength === 7) return;
        var aid7 = document.getElementById('reviews-audio7');
        var vid7 = document.getElementById('reviews-video7');
        aid7.play();
        vid7.play();
        if(MediaStreamLength === 8) return;
        var aid8 = document.getElementById('reviews-audio8');
        var vid8 = document.getElementById('reviews-video8');
        aid8.play();
        vid8.play();
    }else {
        var icon = document.getElementById("playorstop");
        icon.className = 'glyphicon glyphicon-play';

        aid0.pause();
        vid0.pause();
        if(MediaStreamLength === 1) return;
        var aid1 = document.getElementById('reviews-audio1');
        var vid1 = document.getElementById('reviews-video1');
        aid1.pause();
        vid1.pause();
        if(MediaStreamLength === 2) return;
        var aid2 = document.getElementById('reviews-audio2');
        var vid2 = document.getElementById('reviews-video2');
        aid2.pause();
        vid2.pause();
        if(MediaStreamLength === 3) return;
        var aid3 = document.getElementById('reviews-audio3');
        var vid3 = document.getElementById('reviews-video3');
        aid3.pause();
        vid3.pause();
        if(MediaStreamLength === 4) return;
        var aid4 = document.getElementById('reviews-audio4');
        var vid4 = document.getElementById('reviews-video4');
        aid4.pause();
        vid4.pause();
        if(MediaStreamLength === 5) return;
        var aid5 = document.getElementById('reviews-audio5');
        var vid5 = document.getElementById('reviews-video5');
        aid5.pause();
        vid5.pause();
        if(MediaStreamLength === 6) return;
        var aid6 = document.getElementById('reviews-audio6');
        var vid6 = document.getElementById('reviews-video6');
        aid6.pause();
        vid6.pause();
        if(MediaStreamLength === 7) return;
        var aid7 = document.getElementById('reviews-audio7');
        var vid7 = document.getElementById('reviews-video7');
        aid7.pause();
        vid7.pause();
        if(MediaStreamLength === 8) return;
        var aid8 = document.getElementById('reviews-audio8');
        var vid8 = document.getElementById('reviews-video8');
        aid8.pause();
        vid8.pause();
    }
}
function skipForwardReview(){
    var aid0 = document.getElementById('reviews-audio0');
    var vid0 = document.getElementById('reviews-video0');
    aid0.currentTime += 10;
    vid0.currentTime += 10;

    /*if(vid0.currentTime === vid0.duration){
        var icon = document.getElementById("playorstop");
        icon.className = 'glyphicon glyphicon-play';
    }*/

    if(MediaStreamLength === 1) return;
    var aid1 = document.getElementById('reviews-audio1');
    var vid1 = document.getElementById('reviews-video1');
    aid1.currentTime += 10;
    vid1.currentTime += 10;
    if(MediaStreamLength === 2) return;
    var aid2 = document.getElementById('reviews-audio2');
    var vid2 = document.getElementById('reviews-video2');
    aid2.currentTime += 10;
    vid2.currentTime += 10;
    if(MediaStreamLength === 3) return;
    var aid3 = document.getElementById('reviews-audio3');
    var vid3 = document.getElementById('reviews-video3');
    aid3.currentTime += 10;
    vid3.currentTime += 10;
    if(MediaStreamLength === 4) return;
    var aid4 = document.getElementById('reviews-audio4');
    var vid4 = document.getElementById('reviews-video4');
    aid4.currentTime += 10;
    vid4.currentTime += 10;
    if(MediaStreamLength === 5) return;
    var aid5 = document.getElementById('reviews-audio5');
    var vid5 = document.getElementById('reviews-video5');
    aid5.currentTime += 10;
    vid5.currentTime += 10;
    if(MediaStreamLength === 6) return;
    var aid6 = document.getElementById('reviews-audio6');
    var vid6 = document.getElementById('reviews-video6');
    aid6.currentTime += 10;
    vid6.currentTime += 10;
    if(MediaStreamLength === 7) return;
    var aid7 = document.getElementById('reviews-audio7');
    var vid7 = document.getElementById('reviews-video7');
    aid7.currentTime += 10;
    vid7.currentTime += 10;
    if(MediaStreamLength === 8) return;
    var aid8 = document.getElementById('reviews-audio8');
    var vid8 = document.getElementById('reviews-video8');
    aid8.currentTime += 10;
    vid8.currentTime += 10;
}

// Recorded-Videos 공간에 다시 볼 비디오의 갯수만큼 비디오태그를 만들어서 blob url 까지 넣어서 추가해주는 함수
function appendReviewVideos(){
    //이전에 보던 비디오와 오디오들은 삭제
    $('.reviews').remove();

    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder0.blob);
    audio.id = 'reviews-audio0';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder0.blob);
    video.id = 'reviews-video0';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);

    //동영상 종료시 일시정지 버튼이 재생버튼으로 바뀌게.
    var vid0 = document.getElementById('reviews-video0');
    vid0.addEventListener("ended",
        function(){
            var icon = document.getElementById("playorstop");
            icon.className = 'glyphicon glyphicon-play';
        }
        , false
    );
    vid0.addEventListener("played",
        function(){
            var icon = document.getElementById("playorstop");
            icon.className = 'glyphicon glyphicon-pause';
        }
        , false
    );

    if(MediaStreamLength === 1) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder1.blob);
    audio.id = 'reviews-audio1';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder1.blob);
    video.id = 'reviews-video1';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 2) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder2.blob);
    audio.id = 'reviews-audio2';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder2.blob);
    video.id = 'reviews-video2';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 3) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder3.blob);
    audio.id = 'reviews-audio3';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder3.blob);
    video.id = 'reviews-audio3';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 4) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder4.blob);
    audio.id = 'reviews-audio4';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder4.blob);
    video.id = 'reviews-video4';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 5) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder5.blob);
    audio.id = 'reviews-audio5';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder5.blob);
    video.id = 'reviews-video5';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 6) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder6.blob);
    audio.id = 'reviews-audio6';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder6.blob);
    video.id = 'reviews-video6';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 7) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder7.blob);
    audio.id = 'reviews-audio7';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder7.blob);
    video.id = 'reviews-video7';
    video.className = "reviews";
    video.autoplay = true;
    $('#Recorded-Videos').append(video);
    if(MediaStreamLength === 8) return;
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(AudioRecorder8.blob);
    audio.id = 'reviews-audio8';
    audio.className = "reviews";
    audio.autoplay = true;
    $('#Recorded-Videos').append(audio);
    var video = document.createElement('video');
    video.src = window.URL.createObjectURL(VideoRecorder8.blob);
    video.id = 'reviews-video8';
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
        $('#backhome').css('background-color', '#444');
    });
});