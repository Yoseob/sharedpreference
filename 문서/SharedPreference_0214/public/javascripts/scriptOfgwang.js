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
    console.log('groupData');
}

function getGroupMember(){
    //그룹아이디..
}

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