addScores();

var count = 0;
var scrollTimer,
    lastScrollFireTime = 0;

$(document).scroll(timedAction);
$(window).bind('hashchange', addScores());
document.addEventListener("click", addScores);
document.addEventListener("DOMNodeInserted", addScores);

function timedAction() {
    var minScrollTime = 100;
    var now = new Date().getTime();

    if (!scrollTimer) {
        if (now - lastScrollFireTime > (3 * minScrollTime)) {
            var newCount = $(".review").length;
            if (newCount != count) {
                addScores();
            }
            lastScrollFireTime = now;
        }
        scrollTimer = setTimeout(function() {
            scrollTimer = null;
            lastScrollFireTime = new Date().getTime();
            addScores();
        }, minScrollTime);
    }
}

function addScores() {
    count = $(".review").length;
    $(".review").each(function(index) {
        var link = $(this).children(".review__link");
        var href = $(link[0]).attr('href');
        var artwork = $(this).find(".review__meta");

        if (!$(this).hasClass("addedScore")) {
            $(this).addClass("addedScore");
            $.get(href, function(data) {
                var html = $($.parseHTML(data)).find(".score");
                var rating = parseFloat(html[0].textContent);
                rating = rating.toFixed(1).toString();
                if (html.length > 1) {
                    for (var i = 1; i < html.length; i++) {
                        var numeric = parseFloat(html[i].textContent);
                        numeric.toFixed(1).toString();
                        rating += " and " + numeric;
                    }
                }
                $(artwork).prepend("<h2 class=\"genre-list\"><a href=\"" + href + "\"> Score: " + rating + "</a></h2>");
            });
        }
    });
}




