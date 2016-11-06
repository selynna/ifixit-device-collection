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

        var group = document.getElementById("tabs");
        group.appendChild(newLi);
    });
    
    $(".test").html(data.display_titles);
    moveElements();
});



$('.device-list').css('max-height', $(window).height()/3 * 2);
$('.bag').css('max-height', $(window).height() / 3 * 2);
$('.bag').css('min-height', $(window).height() / 3 * 2);

function moveElements() {
    var boxId = "";

    $('.list-of-devices').click(function() {
        boxId = document.getElementById(this.id);
        console.log(boxId);
        if ($(boxId).parents('.tabs').length == 1) {
            console.log("true");
            $(boxId).className = "bag-list-of-devices";
            $(this).appendTo('.bag-tabs');
        }
        else { 
            // ($(boxId).parents('.bag-tabs').length == 1){
            $(this).appendTo('.tabs');
        }
        
    })

}


// function addListeners() {
//     document.getElementById("list-of-devices").addEventListener('mousedown', mouseDown, false);
//     window.addEventListener('mouseup', mouseUp, false);
// }

// function mouseUp() {
//     window.removeEventListener('mousemove', moveElement, true);
// }

// function mouseDown(e) {
//     window.addEventListener('mousemove', moveElement, true);
// }

// function moveElement(e) {
//     var listElement = document.getElementById("list-of-devices");
//     div.style.position = "absolute";
//     div.style.top = e.clientY + 'px';
//     div.style.left = e.clientX + 'px';
// }

