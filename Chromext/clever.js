//Script for calculating the mean value of # students/section @clever.com
//this script only is only used for a certain district
//Author: Yiwei Chen


function SectionSize(test){
    this._districtObj = null;  //district object, assigned in requestDistricts();
    this._studentsObj = null;  //students object, assigned in requestStudentsPerDist();
    this._schoolObj = null; //defualt object, not assigned
    this._sectionCountObj = null; //section number object, assigned in requestSectionCount();
    this._key = "DEMO_KEY"; //demo api key
    this._testcase = test; //fot test only, set it as true to test this class
    this._testStNumber = 0; //for test only, the number of students for all
}


//request for district object
SectionSize.prototype.requestDistricts = function(limit, page, count, where){
    var url = "https://api.getclever.com/v1.1/districts?";
    var thiz = this;
    $.ajax({
        url: url + "limit=" + limit, //in demo, there is only one district, so ignore other parameters.
        type: "GET",
        dataType: "json",
        sync: "false",
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", "Basic " + btoa(thiz._key + ":" + ""));
        },
        success: function(data){
            thiz._districtObj = data;
            if (thiz._testcase == true){
                var id = thiz.getDistrictId(0);
                thiz.requestStudentsInDist(id, thiz._testcase);
            }
        }
    });
}

//request for students object in a certain district
SectionSize.prototype.requestStudentsInDist = function(dist_id, test){
    var url = "https://api.getclever.com/v1.1/districts/";
    var thiz = this;
    $.ajax({
        url: url + dist_id + "/students", //in demo, there is only one district, so ignore other parameters.
        type: "GET",
        dataType: "json",
        sync: "false",
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", "Basic " + btoa(thiz._key + ":" + ""));
        },
        success: function(data){
            thiz._studentsObj = data;
            if (test == true){
                thiz._testStNumber = thiz._studentsObj.paging.count;
                thiz.requestSectionCount(test);
            }
        }
    });
}

//reqeust the section number for a certain district and calculate the average students number per section
SectionSize.prototype.requestSectionCount = function(test){
    var url = "https://api.getclever.com/v1.1/districts/";
    var thiz = this;
    $.ajax({
        url: url + this.getDistrictId(0) + "/sections?count=true", //in demo, there is only one district, so ignore other parameters.
        type: "GET",
        dataType: "json",
        sync: "false",
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", "Basic " + btoa(thiz._key + ":" + ""));
        },
        success: function(data){
            thiz._sectionCountObj = data;
            if (test == true){
                var number = thiz._sectionCountObj.count;
                var avg = thiz._testStNumber/number;
                avg = Math.floor(avg);
                alert(avg);
            }
        }
    });
}

SectionSize.prototype.getDistrictsObj = function(){
    return this._districtObj;
}

SectionSize.prototype.getDistrictId = function(idx){
    var id = this._districtObj.data[idx].data.id;
    return id;
}

SectionSize.prototype.getStudentsObj = function(){
    return this._studentsObj;
}

SectionSize.prototype.getSectionObj = function(){
    return this._sectionCountObj;
}