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
    this._newsCountRet = null;
}

WeiAssNetworkApi.prototype.requestNewsCount = function(ptr){
    var url = "https://rm.api.weibo.com/2/remind/unread_count.json?source=" + this._appkey + "&access_token=" + this._accesstoken;
    var thiz = ptr;
     $.ajax({
         url: url, // url,
         type: "GET",
         dataType: "json",
         syc: "false",
         success: function (data) {
             var ttlcnt = data.follower + data.cmt + data.dm + data.mention_cmt + data.group + data.notice + data.invite;
             if (ttlcnt != 0){
                 thiz.getInfoafterInit(data);
                // alert(ret);
             }else{
                 thiz.getInfoafterInit(-1);
                // alert(thiz._newsCountRet);
             }
         }
     });
}

WeiAssNetworkApi.prototype.getComments = function(count, ptr){
    var url = "https://api.weibo.com/2/comments/to_me.json?source=" + this._appkey + "&count=" + count + "&access_token=" + this._accesstoken;
    var thiz = ptr;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        syc: "false",
        success: function(data){
            var test = data.comments;
        }
    });
}

WeiAssNetworkApi.prototype.rePost = function(count){
    var url = "https://api.weibo.com/2/statuses/repost.json"; /*+ "&id=3521134559460256&access_token=2.00GowZDCPH4tWB4f3f8a3122BmfptC";*/
    $.ajax({
       ur: url,
       type: "POST",
       data: {"source": this._appkey, "id":"3521134559460256", "access_token": this._accesstoken},
       dataType: "json",
       syc: "false",
       success: function(data){
           count--;
           this.rePost(count);
       }
    });
}

WeiAssNetworkApi.prototype.getNewsCount = function(){
    return this._newsCountRet;
}