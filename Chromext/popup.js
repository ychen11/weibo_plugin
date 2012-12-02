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

var test = new WeiAssNetworkApi("1402172485", "2.00GowZDCPH4tWB4f3f8a3122BmfptC");
test.getNewsCount();

function showPhotos() {
  var res = req.responseText;
  $('body').css('background','#000');
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}
