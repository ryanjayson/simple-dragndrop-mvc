//JavaScript
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    $("#" + ev.target.id).css("opacity", "0.4");
    $("#" + ev.target.id).css('border', '2px dashed #000');
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (ev.target.className == "dragable-dropable-area") {
        ev.target.appendChild(document.getElementById(data));
    }
    else {

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            if (ev.target.parentElement.id == "active-dnd") {
                document.getElementById("active-dnd").appendChild(document.getElementById(data));
            }
            else if (ev.target.classList.contains("articleDesc")) {
                ev.target.parentElement.parentElement.appendChild(document.getElementById(data));
            }
            else {
                document.getElementById("all-dnd").appendChild(document.getElementById(data));
            }
        }
        else {

            if (ev.srcElement.parentElement.id == "active-dnd" || ev.target.parentElement.id == "active-dnd") {
                document.getElementById("active-dnd").appendChild(document.getElementById(data));
            }
            else if (ev.srcElement.classList.contains("articleDesc") || ev.target.classList.contains("articleDesc")) {
                ev.srcElement.parentElement.parentElement.appendChild(document.getElementById(data));
            }
            else {
                document.getElementById("all-dnd").appendChild(document.getElementById(data));
            }
        }

    }

    $("#" + data).css("opacity", "1");
}

function dragEnd(event) {
    $("#" + event.target.id).css('border', 'none');
    $("#" + event.target.id).css('border-bottom', '2px solid red');

    if (event.srcElement.parentElement.id == "all-dnd") {
        $("#" + event.target.id).css('border-bottom', '2px solid #ddd');
    }
    else {
        $("#" + event.target.id).css('border-bottom', '2px solid #269abc');
    }

    //Save changes
    var d = event.target.id;
    d = d.substring(12);
    $.ajax({
        url: "/Home/SaveDisplayChanges",
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: { 'id': d },
        success: function (e) {
            if (e.HasError) {
                alert(e);
                return;
            }
            location.reload();
        },
        error: function (e) {

        }
    });
}

function showDescriptionChanged(element, event) {
    //Save changes
    var d = event.target.id;
    d = d.substring(7);
    $.ajax({
        url: "/Home/ChangeShowDescription",
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: { 'id': d },
        success: function (e) {
            if (e.HasError) {
                alert(e);
                return;
            }
            location.reload();
        },
        error: function (e) {

        }
    });

}


//JQUERY
$(document).ready(function () {

    var showChar = 200;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";


    $('.articleDesc').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

    $("input[type=checkbox]").click(function () {

        var articleId = document.getElementById(this.id).parentElement.parentElement.getAttribute('Id')


        if (this.checked) {
            $('#' + articleId + ' .articleDesc').removeClass("hidden").addClass("show");
        }
        else {
            $('#' + articleId + ' .articleDesc').removeClass("show").addClass("hidden");
        }



    });

});