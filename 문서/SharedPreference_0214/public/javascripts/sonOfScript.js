/**
 * Created by leeyoseob on 15. 2. 17.
 */

    console.log('sty');
var friends = [];
//화면크기 조절을 감지하여 footer의 높이를 조절해주는 함수
window.onresize = function resizeFooterHeight() {
    var ClientWidth = document.body.clientWidth;
    var ClientHeight = document.body.clientHeight;
// 화면의 넓이가 높이보다 좁아지면 (화면이 세로로 길어지면)
    if (ClientWidth < ClientHeight) {
        $('#footer').css('height', ClientWidth / 4 + 'px');
    } else {
        $('#footer').css('height', ClientHeight / 4 + 'px');
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
        // alert("마우스 휠 아래로~");
    }
    else {
        // alert("마우스 휠 위로~");
    }
}

//마우스 이벤트
function wheel(event) {
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
    } else if (event.detail) delta = -event.detail / 3;
    if (delta) handle(delta);
}

/*친구목록에 마우스휨이 동작하게 하는 부분*/
$(document).ready(function () {
    $('#sidebar-wrapper').mouseenter(function () {
        if ($('#sidebar-wrapper').hover()) {
            $('#sidebar-wrapper').css('-webkit-transform', 'translate(130px,0px)');
        }
    });
    $('#sidebar-wrapper').mouseleave(function () {
        $('#sidebar-wrapper').css('-webkit-transform', 'translate(-0px,0px)');
    });


    $('#glyphicon-record').mouseenter(function () {
        if ($('#sidebar-wrapper').hover()) {
            $('#guidemsg').append("영상 녹화 On/Off");
            $('#guidemsg').css('width', '120px');
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-record').mouseleave(function () {
        $('#guidemsg').empty();
        $('#guidemsg').css('width', '125px');
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-comment').mouseenter(function () {
        if ($('#sidebar-wrapper').hover()) {
            $('#guidemsg').css('width', '100px');
            $('#guidemsg').append("채팅창 On/Off");
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-comment').mouseleave(function () {
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-sharescreen').mouseenter(function () {
        if ($('#sidebar-wrapper').hover()) {
            $('#guidemsg').append("화면 공유 On/Off");
            $('#guidemsg').css('width', '120px');
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-sharescreen').mouseleave(function () {
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-repeat').mouseenter(function () {
        if ($('#sidebar-wrapper').hover()) {
            $('#guidemsg').append("녹화영상 다시보기");
            $('#guidemsg').css('width', '125px');
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-repeat').mouseleave(function () {
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

    $('#glyphicon-logout').mouseenter(function () {
        if ($('#glyphicon-logout').hover()) {
            $('#guidemsg').css('width', '60px');
            $('#guidemsg').append("로그아웃");
            $('#guidemsg').css('-webkit-transform', 'translate(280px, 0px)');
        }
    });
    $('#glyphicon-logout').mouseleave(function () {
        $('#guidemsg').empty();
        $('#guidemsg').css('-webkit-transform', 'translate(-280px, 0px)');
    });

});

//채팅 버튼 눌렀을 때 채팅창 뜨게 하는 함수 //제이쿼리이용 - 태양
$(document).ready(function () {
    $('#glyphicon-comment').click(function () {
        //채팅창이 없었을 경우 클릭시 if문 수행
        if ($('#chatting-space').css("display") === 'none') {

            $('#footer').css('margin-left', 'calc(20% + 70px)');
            $('#footer').css('width', 'calc(75% - 70px)');
            $('#Wvideos').css('width', 'calc(80% - 70px)');
            $('#Wvideos').css('margin-left', 'calc(20% + 70px)');
            $('#chatting-space').slideToggle('slow');
        }
        //채팅창이 있었을 경우 클릭시 else문 수행
        else {
            $('#Wvideos').css('margin-left', '70px');
            $('#Wvideos').css('width', 'calc(100% - 70px)');
            $('#chatting-space').slideToggle('slow');

            setTimeout(function () {
                $('#footer').css('margin-left', '70px');
                $('#footer').css('width', '95%');
            }, 500);
        }
    });
});
function initFriendsList() {

    function Friend(id, name, imgurl) {
        this.id = id;
        this.name = name;
        this.imgurl = imgurl;
    }

    var dummy1 = new Friend('54de1ab66e8eb71f3ef2151f1', '송태양', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy2 = new Friend('54de1ab66e8eb71f3ef2151f2', '이요섭', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy3 = new Friend('54de1ab66e8eb71f3ef2151f3', '유광열', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy4 = new Friend('54de1ab66e8eb71f3ef2151f4', '남두현', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy5 = new Friend('54de1ab66e8eb71f3ef2151f5', '정재현', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy6 = new Friend('54de1ab66e8eb71f3ef2151f6', '김수지', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy7 = new Friend('54de1ab66e8eb71f3ef2151f7', '박태현', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy8 = new Friend('54de1ab66e8eb71f3ef2151f8', '임용규', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy9 = new Friend('54de1ab66e8eb71f3ef2151f9', '윤필립', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy10 = new Friend('54de1ab66e8eb71f3ef2151f0', '손승하', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy11 = new Friend('54de1ab66e8eb71f3ef2151f11', '손진오', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy12 = new Friend('54de1ab66e8eb71f3ef2151f12', '김민수', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy13 = new Friend('54de1ab66e8eb71f3ef2151f13', '김상윤', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy14 = new Friend('54de1ab66e8eb71f3ef2151f14', '김은민', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy15 = new Friend('54de1ab66e8eb71f3ef2151f15', '권용훈', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy16 = new Friend('54de1ab66e8eb71f3ef2151f16', '이정우', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy17 = new Friend('54de1ab66e8eb71f3ef2151f17', '이정훈', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy18 = new Friend('54de1ab66e8eb71f3ef2151f18', '최한솔', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy19 = new Friend('54de1ab66e8eb71f3ef2151f19', '이세리', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');
    var dummy20 = new Friend('54de1ab66e8eb71f3ef2151f20', '임송묵', 'http://playchalk.com/media/image/accounts/default_profile_img.jpg');

    friends.push(dummy1);
    friends.push(dummy2);
    friends.push(dummy3);
    friends.push(dummy4);
    friends.push(dummy5);
    friends.push(dummy6);
    friends.push(dummy7);
    friends.push(dummy8);
    friends.push(dummy9);
    friends.push(dummy10);
    friends.push(dummy11);
    friends.push(dummy12);
    friends.push(dummy13);
    friends.push(dummy14);
    friends.push(dummy15);
    friends.push(dummy16);
    friends.push(dummy17);
    friends.push(dummy18);
    friends.push(dummy19);
    friends.push(dummy20);


    for (var i = 0; i < friends.length; i++) {
        var li_ = document.createElement('li');
        var img_ = document.createElement('img');

        li_.id = friends[i].id;
        li_.textContent = friends[i].name;
        img_.className = "profileimgs";
        img_.src = friends[i].imgurl;

        li_.appendChild(img_);

        li_.onclick = function () {
            alert('ID: ' + this.id + "\n이름: " + this.textContent + ".");
        };
        li_.onmouseover = function () {
            this.setAttribute('style', 'background-color:#999');
        };
        li_.onmouseout = function () {
            this.setAttribute('style', 'background-color:#383838');
        };
        $('.sidebar-friends').append(li_);
    }
}