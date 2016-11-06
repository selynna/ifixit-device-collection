$('.device-list').css('max-height', $(window).height()/3 * 2);
$('.bag').css('max-height', $(window).height() / 3 * 2);
$('.bag').css('min-height', $(window).height() / 3 * 2);

// $.get("https://www.ifixit.com/api/2.0/suggest/phone?doctypes=device", function(data) {
//     console.log(data);
// });

// $.get("https://www.ifixit.com/api/2.0/categories", function(data) {
//     categoriesJSON = JSON.stringify(data);
//     var parsedCategories = $.parseJSON(categoriesJSON);
//     console.log(parsedCategories);
//     var i = 1;
//     $.each(parsedCategories, function(key1, value1) {
//         console.log(key1);
//         var newLi = document.createElement("li");
//         var newHref = document.createElement("a");
//         var newContent = document.createTextNode(" " + key1 + " ");
//         newHref.href="#box-" + i.toString();
//         i++;
//         newHref.appendChild(newContent);
//         newLi.appendChild(newHref);

//         var tabsGroup = document.getElementById("tabs");
//         tabsGroup.appendChild(newLi);
//         console.log(value1);
//     })
// });

function getInitialItems() {
    
}

var listOfDevices = [];
var listOfBagDevices = [];

$.get("https://www.ifixit.com/api/2.0/wikis/CATEGORY?display=hierarchy", function(data) {
    itemsJSON = JSON.stringify(data.display_titles);
    var parsedJSON = $.parseJSON(itemsJSON);

    $.each(parsedJSON, function(key, value) {
        // console.log(value);
        var newLi = document.createElement("li");
        newContent = document.createTextNode(value.trim());
        newLi.appendChild(newContent);
        newLi.className = "list-of-devices";
        newLi.id = value.trim();

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
    $('.list-of-devices').click(function() {
        boxId = document.getElementById(this.id);
        indexDeviceList = listOfDevices.indexOf(boxId);
        var elementInArray = listOfDevices[indexDeviceList];
        indexBagList = listOfBagDevices.indexOf(boxId);
        var elementInBagArray = listOfBagDevices[indexBagList];

        if ($(boxId).parents('.tabs').length == 1) {
            console.log("true");
            listOfDevices.splice(indexDeviceList, 1);
            listOfBagDevices.push(elementInArray);
            for (i = 0; i < listOfBagDevices.length; i++) {
                document.getElementById("bag-tabs").appendChild(listOfBagDevices[i]);
            }
        }
        else { 
            listOfBagDevices.splice(indexBagList, 1);
            listOfDevices.push(elementInBagArray);
            for (i = 0; i < listOfBagDevices.length; i++) {
                console.log(listOfBagDevices[i]);
            }
            // document.getElementById("tabs").appendChild(elementInArray);
            $(this).appendTo('.tabs');
        }
        
    })

}

$('#device-search').on('keyup', function() {
    var deviceInputValue = $('#device-search').val();
    if (deviceInputValue == "") {
        $('.tabs').prepend($('.list-of-devices'))
    } else {
        $.get("https://www.ifixit.com/api/2.0/suggest/" + deviceInputValue + "?doctypes=device", function(data) {
            var parsedSuggestions = $.parseJSON(JSON.stringify(data.results));
            for (i = 0; i < listOfBagDevices.length; i++) {
                document.getElementById("tabs").appendChild(listOfBagDevices[i]);
            }
            if (parsedSuggestions.length == 0) {
                console.log("num suggestion = 0");
                $('.list-of-devices').detach();
                for (i = 0; i < listOfBagDevices.length; i++) {
                    document.getElementById("bag-tabs").appendChild(listOfBagDevices[i]);
                }
                // var content = document.createTextNode("No results");
                // var newEle = document.createElement("li");
                // newEle.appendChild(content);
                // var group = document.getElementById("tabs");
                // noResultList.push("content");
                // group.appendChild(noResultList[0]);
            } else {
                for (i = 0; i < listOfBagDevices.length; i++) {
                    document.getElementById("bag-tabs").appendChild(listOfBagDevices[i]);
                }
                for (var i = 0; i < 10; i++) {
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
    detectHover();

});

function detectHover() {
    var isHovered = $('.device-list').is(":hover");
    console.log(isHovered);
    if (isHovered == false) {
        console.log("fajlksf");
        $('#device-search').val("");
    } else {
        ;
    }

    
}
