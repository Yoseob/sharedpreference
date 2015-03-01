/**
 * Created by rgy on 2015-02-22.
 */

var file_name='';
var curUsername=new DefaultUserinfo();

function requestLogout(){
    var userInfo=new DefaultUserinfo();
    var account_id=userInfo.getUserId();

    var nc=new TjNetworkConnector();
   // console.log('logoutTest');
    nc.logoutFunc({account_id:account_id},startLogout);

}

function startLogout(result){
   // console.log('logout!!!!!!!!!!!!!!');

    var data=result.data;

    var userState=data.state;
  //  console.log(userState);
}

function initGroup(){
    var data={};
    var userInfo=new DefaultUserinfo();

    data.ownerId=userInfo.getUserName();
    data._id=userInfo.getUserId();

    var nc=new TjNetworkConnector();
//    console.log('initGroupTest');
    nc.groupCreateOrJoin(data,startGroupInit);
}

function startGroupInit(result){
    //console.log('initGroupTest222');

    var groupData=result.data;
  //  console.log(groupData);
}

function getGroupMember(){
    //group_id ..d
}

/*
$(document).ready(function(){
    $('#glyphicon-logout').click(function(){

    });
});
*/


var client = new BinaryClient('ws://210.118.64.176:8100');

client.on('stream' , function(stream , meta){
    var buffer = [];


    //console.log(meta);
    stream.on('data' , function(data){
        console.log(data);
        buffer.push(data);

    });
    stream.on('end' , function(){

        // img size 정해줄 것.
        console.log(meta);

        var extention=meta.filename.split(".");
        console.log(extention[1]);
        if(extention[1]==="jpg" || extention[1]==="png" || extention[1]==="jpeg" || extention[1]==="gif"){
            console.log('end log');
            var img = document.createElement("img");

            img.width=100;

            console.log(buffer);
            saveByteArray(buffer,meta.filename,img,meta.username);
        }

        else if(extention[1]==="mp4" || extention[1]==="wmv"){
            console.log('end log');
            var cVideo = document.createElement("video");

            cVideo.width=100;
            cVideo.height=75;
            cVideo.autoplay=false;
            cVideo.currentTime=2;
            cVideo.load();
            console.log(buffer);
            saveByteArray(buffer,meta.filename,cVideo,meta.username);
        }
        else{
            console.log('end log');
            console.log(buffer);
            other_saveByteArray(buffer,meta.filename,meta.username);
        }

    });
});

// Wait for connection to BinaryJS server
client.on('open', function(){
    client.send({} , {roomname : curUsername.getTargetUser() , filetype : 'init' , sendType: 'p2p'});
    var box = $('#results');
    box.on('dragenter', doNothing);
    box.on('dragover', doNothing);

    box.on('drop', function(e){
        e.originalEvent.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];

        var fileinfo = {};

        fileinfo.fileEndata = new Date();
        fileinfo.username = curUsername.getUserName();
        fileinfo.filename =  file.name;
        fileinfo.groupname = '';
        fileinfo.roomname = curUsername.getTargetUser();
        fileinfo.sendType = 'p2p';
        filesize = file.size;

        var stream = client.send(file,fileinfo);


        var tx = 0;
        stream.on('data', function(data){
            $('#progress').text(Math.round(tx+=data.rx*100) + '% complete');
        });
    });
});

// Deal with DOM quirks
function doNothing (e){
    e.preventDefault();
    e.stopPropagation();
}

var saveByteArray = (function () {


    return function (data, name,img,username) {
        var blob = new Blob(data, {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);


        if(username === curUsername.getUserName()){
            img.src=url;
            var a = document.createElement("a");
            a.href = url;
            a.download = name;

            a.appendChild(img);
            document.getElementById('results').appendChild(a);

        }
        else{
            var a = document.createElement("a");
            img.src=url;
            img.setAttribute('style','margin-left:0');
            a.href = url;
            a.download = name;

            a.appendChild(img);
            document.getElementById('results').appendChild(a);

        }
    };
}());

var other_saveByteArray = (function () {


    return function (data, name,username) {
        var blob = new Blob(data, {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);

        if(username === curUsername.getUserName()){
            var a = document.createElement("a");
            var myDiv = document.createElement("div");
            myDiv.className="imageContainer";
            a.href = url;
            a.download = name;

            console.log(name.length);

            if(name.length>8){
                var newName=name.slice(0,6);
                myDiv.innerHTML=newName+"..";
                a.appendChild(myDiv);
                document.getElementById('results').appendChild(a);
            }
            else{
                myDiv.innerHTML=name;
                a.appendChild(myDiv);
                document.getElementById('results').appendChild(a);
            }

        }
        else{
            var a = document.createElement("a");
            var myDiv = document.createElement("div");
            myDiv.className="imageContainer";
            myDiv.setAttribute('style','margin-left:0');
            a.href = url;
            a.download = name;

            if(name.length>8){
                var newName=name.slice(0,6);
                myDiv.innerHTML=newName+"..";
                a.appendChild(myDiv);
                document.getElementById('results').appendChild(a);
            }
            else{
                myDiv.innerHTML=name;
                a.appendChild(myDiv);
                document.getElementById('results').appendChild(a);
            }

        }
    };
}());
