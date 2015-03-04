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


var client = new BinaryClient('ws://210.118.64.172:8100');

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
        fileinfo.groupname = curUsername.getTargetUser();
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



            a.appendChild(img);
            document.getElementById('results').appendChild(a);

        }
    };
}());

/*

var client = new BinaryClient('ws://210.118.64.176:8100');

client.on('stream' , function(stream , meta){
    var buffer = [];

    console.log(meta);
    stream.on('data' , function(data){
        console.log(data);
        buffer.push(data);

    });
    stream.on('end' , function(){

        console.log('end log');
        var img = document.createElement("img");
        img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(buffer));
        //document.body.appendChild(img);
        img.width=100;

        elementFunc(img);







        /*
        var a=document.createElement('a');
        //a.href="/images/image.src"+".jpg";
        a.href="/bin/"+file.name;
        a.download=file.name;
        //a.download="image";

        a.appendChild(img);
        //results.appendChild(a);


    });
});

*/
/*
// Wait for connection to BinaryJS server
client.on('open', function(){
    client.send({} , {roomname : 'testroomname' , filetype : 'init'});
    var box = $('#results');
    box.on('dragenter', doNothing);
    box.on('dragover', doNothing);
    box.text('Drag files here');
    box.on('drop', function(e){
        e.originalEvent.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];

        file_name=file;

        // Add to list of uploaded files
        $('<div align="center"></div>').append($('<a></a>').text(file.name).prop('href', '/'+file.name)).appendTo('body');

        // `client.send` is a helper function that creates a stream with the
        // given metadata, and then chunks up and streams the data.
        var fileinfo = {};

        fileinfo.fileEndata = new Date();
        fileinfo.username = '';
        fileinfo.filename =  file.name;
        fileinfo.groupname = '';
        fileinfo.roomname = 'testroomname';
        filesize = file.size;

        var stream = client.send(file,fileinfo);


        // Print progress
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

function elementFunc(img){
    var a = document.createElement("a");
    //console.log(file.name);
    //a.href="/bin/"+file.name;
    console.log("functest");
    a.setAttribute('href',"/bin/"+file_name.name);
    a.download=file_name.name;

    a.appendChild(img);
    document.getElementById('results').appendChild(a);
}
*/


/*
function getChatData(result){
    var data=result.data;
    chatList=data.chatlist;
    console.log('chatList');

    for(var i=0;i<chatList.length;i++){
        console.log(chatList[i].cRoomId);
        console.log(chatList[i].msg);
        console.log(chatList[i].ownerId);
        console.log(chatList[i].updated);
    }
}
*/


/*
var client = new BinaryClient('ws://210.118.64.176:8000' , {room_id : 'yoseobZZZAngi'});

client.on('stream' , function(stream , meta){

    console.log(stream ,  meta);

});
// Wait for connection to BinaryJS server
client.on('open', function(){
    var box = $('#results');
    box.on('dragenter', doNothing);
    box.on('dragover', doNothing);
    box.text('Drag files here');
    box.on('drop', function(e){
        e.originalEvent.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];

        // Add to list of uploaded files
        $('<div align="center"></div>').append($('<a></a>').text(file.name).prop('href', '/'+file.name)).appendTo('body');

        // `client.send` is a helper function that creates a stream with the
        // given metadata, and then chunks up and streams the data.
        var fileinfo = {};

        fileinfo.fileEndata = new Date();
        fileinfo.username = '';
        fileinfo.filename =  file.name;
        fileinfo.groupname = '';
        fileinfo.roomname = 'yoseob';
        filesize = file.size;

        var stream = client.send(file,fileinfo);



        // Print progress
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
*/

/*
var results = document.getElementById('results'),
    tests = {
        filereader: typeof FileReader != 'undefined',
        dnd: 'draggable' in document.createElement('span'),
        formdata: !!window.FormData,
        progress: "upload" in new XMLHttpRequest
    },
    support = {
        filereader: document.getElementById('filereader'),
        formdata: document.getElementById('formdata'),
        progress: document.getElementById('progress')
    },
    acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
    };
    progress = document.getElementById('uploadprogress'),
    fileupload = document.getElementById('upload');

"filereader formdata progress".split(' ').forEach(function (api) {
    if (tests[api] === false) {
        support[api].className = 'fail';
    } else {
        // FFS. I could have done el.hidden = true, but IE doesn't support
        // hidden, so I tried to create a polyfill that would extend the
        // Element.prototype, but then IE10 doesn't even give me access
        // to the Element object. Brilliant.
        support[api].className = 'hidden';
    }
});

function previewfile(file) {
    if (tests.filereader === true && acceptedTypes[file.type] === true) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var image = new Image();
            image.src = event.target.result;
            image.width = 100; // a fake resize



            var a=document.createElement('a');
            //a.href="/images/image.src"+".jpg";
            a.href=file.name;
            a.download=file.name;
            //a.download="image";

            //span.setattribute("style","height:90%");
//                a.setAttribute("style","border-top-width:medium; border-left-width:medium; border-right-width:medium; border-top-width:medium;");


            a.appendChild(image);
            results.appendChild(a);
            // $('#down').append(image);
        };

        reader.readAsDataURL(file);
    }  else {

        results.innerHTML += '<a href="/root/path" download="sharedFile"><p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
        console.log(file);
    }
}


function readfiles(files) {
    debugger;
    var formData = tests.formdata ? new FormData() : null;
    for (var i = 0; i < files.length; i++) {
        if (tests.formdata) formData.append('file', files[i]);
        previewfile(files[i]);
    }

    // now post a new XHR request
    if (tests.formdata) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/devnull.php');
        xhr.onload = function() {
            progress.value = progress.innerHTML = 100;
        };

        if (tests.progress) {
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable) {
                    var complete = (event.loaded / event.total * 100 | 0);
                    progress.value = progress.innerHTML = complete;
                }
            }
        }

        xhr.send(formData);
    }
}

if (tests.dnd) {
    results.ondragover = function () { this.className = 'hover'; return false; };
    results.ondragend = function () { this.className = ''; return false; };
    results.ondrop = function (e) {
        this.className = '';
        e.preventDefault();
        readfiles(e.dataTransfer.files);
    }
} else {
    fileupload.className = 'hidden';
    fileupload.querySelector('input').onchange = function () {
        readfiles(this.files);
    };
}

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));

try {
    var pageTracker = _gat._getTracker("UA-1656750-18");
    pageTracker._trackPageview();
} catch(err) {}

*/