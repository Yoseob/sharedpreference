/**
 * Created by leeyoseob on 15. 2. 17.
 */


function responseModule(){}

responseModule.prototype = {

    _response : function(res , data){
        res.header("Access-Control-Allow-Origin" , "*");
        res.send(data);

    }
};

module.exports  = new responseModule();