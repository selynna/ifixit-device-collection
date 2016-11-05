// $.get("https://www.ifixit.com/api/2.0/suggest/phone?doctypes=device", function(data) {
//     console.log(data);
// });

$.get("https://www.ifixit.com/api/2.0/categories", function(data) {
    categoriesJSON = JSON.stringify(data);
    var parsedCategories = $.parseJSON(categoriesJSON);
    console.log(parsedCategories);
    $.each(parsedCategories, function(key1, value1) {
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
