$('.device-list').css('max-height', $(window).height());
$('.bag').css('max-height', $(window).height());
$('.bag').css('min-height', $(window).height());
$('.back').hide();

var listOfDevices = [];
var listOfBagDevices = [];
var itemsJSON;
var parsedJSON;

$.get("https://www.ifixit.com/api/2.0/wikis/CATEGORY?display=hierarchy", function(data) {
    itemsJSON = JSON.stringify(data.hierarchy);
    parsedJSON = $.parseJSON(itemsJSON);

    $.each(parsedJSON, function(key, value) {
        var newLi = document.createElement("li");
        newContent = document.createTextNode(key);
        newLi.appendChild(newContent);
        newLi.className = "list-of-devices device";
        newLi.id = key;

        listOfDevices.push(newLi);
    });
    
    console.log(listOfDevices[0]);
    var i = 0;
    while(i < listOfDevices.length) {
        var group = document.getElementById("tabs");
        group.appendChild(listOfDevices[i]);
        i++;
    }
    moveElements();


});

function moveElements() {
    var boxId = "";
    var indexDeviceList;
    var indexBagList;
    var i = 0;
    var group = document.getElementById("tabs");
    var tmp = parsedJSON;
    var tmpArr = [];
    if (tmpArr.length == 0) {
        console.log("legnth = 0");
        $('.back').hide();
    } else {
        $('.back').show();
    }

    if (tmpArr.length == 1) {
        $('.path').hide();
    } else {
        $('.path').show();
    }
    $(document).on('click', '.tabs .list-of-devices', function() {
        tmp = parsedJSON;
        console.log("clicked");
        console.log(tmpArr.length);
        $('.path').show();
        $.each(tmpArr, function(index, value) {
            tmp = tmp[value];
        })
        if (tmp[this.id] == null) {
            var newSubLi = document.createElement("li");
            newContent = document.createTextNode(this.id);
            newSubLi.appendChild(newContent);
            newSubLi.className = "list-of-devices";
            document.getElementById("bag-tabs").appendChild(newSubLi);
        } else {
            $('.path').text(tmpArr.join(" > "));
            tmp = tmp[this.id];
            $('.tabs .list-of-devices').detach();
            tmpArr.push(this.id);
            $('.back').show();
            $.each(tmp, function(key, value) {
                console.log(key);
                var newSubLi = document.createElement("li");
                newContent = document.createTextNode(key);
                newSubLi.appendChild(newContent);
                newSubLi.className = "list-of-devices";
                newSubLi.id = key;
                group.appendChild(newSubLi);
            });
            $('.path').text(tmpArr.join(" > "));
            
        }

        
    })
    $(document).on('click', '.bag-tabs .list-of-devices', function() {
        $(this).detach();
    })

    $('.back').click(function() {
        console.log(tmpArr.length);
        console.log(tmpArr[0]);
        var location = parsedJSON;
        if (tmpArr.length == 1) {
            console.log("length = 0");
            $('.path').hide();
        } else {
            $('.path').show();
        }
        for (var i = 0; i < tmpArr.length - 1; i++) {
            location = location[tmpArr[i]];
        }
        console.log(location);
        $('.tabs .list-of-devices').remove();
        $.each(location, function(key, value) {
            var newSubLi = document.createElement("li");
            newContent = document.createTextNode(key);
            newSubLi.appendChild(newContent);
            newSubLi.className = "list-of-devices";
            newSubLi.id = key;
            group.appendChild(newSubLi);
            $('.path').text(tmpArr.join(" > "));

        });
        tmpArr.pop();
        $('.path').text(tmpArr.join(" > "));
        if (tmpArr.length == 0) {
            $('.back').hide();
        } else {
            $('.back').show();
        }
    })

}

$('#device-search').on('keyup', function() {
    var deviceInputValue = $('#device-search').val();
    var group = document.getElementById("tabs");
    if (deviceInputValue == "") {
        $('.tabs .list-of-devices').detach();
        console.log("detached");
        $.each(parsedJSON, function(key, value) {
            var newLi = document.createElement("li");
            newContent = document.createTextNode(key);
            newLi.appendChild(newContent);
            newLi.className = "list-of-devices";
            newLi.id = key;
            group.appendChild(newLi);

        });
        
    } else {
        $.get("https://www.ifixit.com/api/2.0/suggest/" + deviceInputValue + "?doctypes=device", function(data) {
            var parsedSuggestions = $.parseJSON(JSON.stringify(data.results));
            // for (i = 0; i < listOfBagDevices.length; i++) {
            //     document.getElementById("tabs").appendChild(listOfBagDevices[i]);
            // }
            if (parsedSuggestions.length == 0) {
                $('.tabs .list-of-devices').remove();
            } else {
                $('.tabs .list-of-devices').detach();
                for (var i = 0; i < parsedSuggestions.length; i++) {
                    var value = parsedSuggestions[i].display_title;
                    console.log(parsedSuggestions[i].display_title);
                    var newLi = document.createElement("li");
                    newContent = document.createTextNode(value.trim());
                    newLi.appendChild(newContent);
                    newLi.className = "list-of-devices";
                    newLi.id = value.trim();

                    var group = document.getElementById("tabs");
                    group.appendChild(newLi);
                }
            }
        });
        
    }
    console.log(deviceInputValue);

});

