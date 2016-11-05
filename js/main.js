// $.get("https://www.ifixit.com/api/2.0/suggest/phone?doctypes=device", function(data) {
//     console.log(data);
// });

$.get("https://www.ifixit.com/api/2.0/categories", function(data) {
    categoriesJSON = JSON.stringify(data);
    var parsedCategories = $.parseJSON(categoriesJSON);
    console.log(parsedCategories);
    var i = 1;
    $.each(parsedCategories, function(key1, value1) {
        console.log(key1);
        var newLi = document.createElement("li");
        var newHref = document.createElement("a");
        var newContent = document.createTextNode(" " + key1 + " ");
        newHref.href="#box-" + i.toString();
        i++;
        newHref.appendChild(newContent);
        newLi.appendChild(newHref);

        var tabsGroup = document.getElementById("tabs");
        tabsGroup.appendChild(newLi);
        console.log(value1);
    })
});

// $.get("https://www.ifixit.com/api/2.0/wikis/CATEGORY?display=hierarchy", function(data) {
//     itemsJSON = JSON.stringify(data.display_titles);

//     var parsedJSON = $.parseJSON(itemsJSON);
//     $.each(parsedJSON, function(key, value) {
//         console.log(value);
//     });
//     // for (var value in itemsJSON) {
//     //     console.log(itemsJSON[value]);
//     // }
//     // console.log(JSON.stringify(data.display_titles));
//     $(".test").html(data.display_titles);
// });

$(function() {
    $('.tabs li a').on('click', function() {
        showContent($(this).index()); 
    });

    showContent(0);


function showContent(index) {
    $('.tabs .content.visible').removeClass('visible');
    $('.tabs .content:nth-of-type(' + (index + 1) + ')').addClass('visible');

    $('.tabs li a.selected').removeClass('selected');
    $('.tabs li a:nth-of-type(' + (index + 1) +')').addClass('selected');
}

});
