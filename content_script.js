

$(".review").each(function(index) {
    var link = $(this).children(".album-link");
    var title = $(this).find(".album-artist");
    $.get($(link[0]).attr('href'), function(data) {
        var rating = parseRating(data);
        $(title).append("<h2 class=\"title addedScore\">Score: " + rating + "</h2>");
    });
});

// for (album in albums) {
//     console.log(album.querySelector("a"));

//     var albumArt = $(album).find(".album-link");
//     console.log(albumArt[0]);
//     console.log($(albumArt[0]).attr("href"));
// }



function parseRating(data) {
    var html = $($.parseHTML(data)).find(".score");
    return html.text();
}