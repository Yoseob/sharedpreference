/**
 * Created by rgy on 2015-02-22.
 */

function requestLogout(){
    var userInfo=new DefaultUserinfo();
    var account_id=userInfo.getUserId();

    var nc=new TjNetworkConnector();
    console.log('logoutTest');
    nc.logoutFunc({account_id:account_id},startLogout);

}

function startLogout(result){
    console.log('logout!!!!!!!!!!!!!!');

    var data=result.data;

    var userState=data.state;
    console.log(userState);
}

function initGroup(){
    var data={};
    var userInfo=new DefaultUserinfo();

    data.ownerId=userInfo.getUserName();
    data._id=userInfo.getUserId();

    var nc=new TjNetworkConnector();
    console.log('initGroupTest');
    nc.groupCreateOrJoin(data,startGroupInit);
}

function startGroupInit(result){
    console.log('initGroupTest222');

    var groupData=result.data;
    console.log(groupData);
}

function getGroupMember(){
    //group_id ..
}


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
    },
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
            a.href="/images/image.src"+".jpg";
            a.download="image";

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


