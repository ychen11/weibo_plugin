//Weibo Assistant, ver. in development
//popup.js is the main controller.
//Author: Yiwei Chen 
//Email: chenyiwei1987@gmail.com


var req = new XMLHttpRequest();
req.open(
    "GET",
    "https://api.weibo.com/2/comments/to_me.json?" +
    "source=1402172485" +
    "&access_token=2.00GowZDCPH4tWB4f3f8a3122BmfptC",
 /*   "http://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
        "text=hello%20world&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=20",
   */     
    true);
req.onload = showPhotos;
req.send(null);

function MainController(){
    this._username = null;
    this._networkobj = null;
}

MainController.prototype.InitHomePage = function(){
    //document.getElementById('no_news').style = "dispz;
    $(document).ready(function(){
        $("#main_space").hide();
        $("#loading_space").show();
    });
    //$("p").hide();
    //alert("sucess");
    this._networkobj = new WeiAssNetworkApi("1402172485", "2.00GowZDCPH4tWB4f3f8a3122BmfptC");
    this._networkobj.requestNewsCount(this);
    
 /*   var data = null;
    var thiz = this;
    setTimeout(function(){
        var tmp = thiz._networkobj.getNewsCount();
        if (tmp != null)
            data = tmp;
    }, 10000);
    if (-1 == data){
        aler("sucess!");
        $("#main_space").css({'width':'200px','height':'150px'});
    }*/
}

MainController.prototype.getInfoafterInit = function(obj){
    if (obj == -1){
        $("#main_space").show();
        $("#loading_space").hide();
        $("#main_space").css({'width':'100px','height':'30px'});
        $("#no_news").text("No news...");
        $("#no_news").css({'text-align':'center'});
    }else{
        this._networkobj.getComments(10, this);
    }
}

var mainObj = new MainController();
mainObj.InitHomePage();


function showPhotos() {
  var res = req.responseText;
 // $('body').css('background-image','url(background.jpg)');
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}
