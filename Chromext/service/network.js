//Weibo Assistant, ver. in development
//network.js is the network class 
//Author: Yiwei Chen 
//Email: chenyiwei1987@gmail.com

function WeiAssInitData(userid, accesstoken){
    this._uid = userid;
    this._accessToken = accesstoken;
}

WeiAssInitData.prototype.getUserId = function(){
    return this._uid;
}

WeiAssInitData.prototype.getToken = function(){
    return this._accessToken;
}

function WeiAssNetworkApi(appkey, accesstoken){
    this._appkey = appkey;
    this._accesstoken = accesstoken;
}

WeiAssNetworkApi.prototype.getNewsCount = function(){
    var url = "https://rm.api.weibo.com/2/remind/unread_count.json?source=" + this._appkey + "&access_token=" + this._accesstoken;
     $.ajax({
         url: url, // url,
         type: "GET",
         dataType: "json",
         syc: "false",
         success: function (data) {
             var ttlcnt = data.follower;
             if (ttlcnt != 0)
                 alert("news");
             else
                 alert("no news");
         }
     });
}