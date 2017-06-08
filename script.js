var bookArray = [];

var fetch = function (url) {
    $.ajaxSetup({
        beforeSend: function () {
            $(".loading").show();
        },
        complete: function () {
            $(".loading").hide();
        }
    })
    $.ajax({
        method: "GET",
        url: url,
        success: function (data) {
            if (data.totalItems > 0) {
                bookArray = [];
                for (i = 0; i <= 9 && i <= data.totalItems; i++) {
                    var title = data.items[i].volumeInfo.title;
                    if (data.items[i].volumeInfo.authors) {
                        var authors = data.items[i].volumeInfo.authors[0];
                    }
                    else {
                        var authors = "N/A";
                    }
                    if (description = data.items[i].volumeInfo.description) {
                        var description = data.items[i].volumeInfo.description;
                    }
                    else {
                        var description = "N/A";
                    }
                    if (data.items[i].volumeInfo.imageLinks) {
                        var img = data.items[i].volumeInfo.imageLinks.thumbnail;
                    }
                    else {
                        var img = "https://cdn1.iconfinder.com/data/icons/school-supplies-3/64/folder_denied_stop_not_found_deleted_error-128.png";
                    }
                    bookToPush = createObj(title, authors, description, img);
                    bookArray.push(bookToPush);
                    listBook();
                }
            }
            else {
                alert("Invalid Search");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

var createObj = function (title, authors, description, img) {
    var book = {
        title: title,
        authors: authors,
        description: description,
        img: img
    }
    return book;
}

var listBook = function () {
    var appendTo = $(".book-list");
    appendTo.empty();
    var source = $('#new-book').html();
    var template = Handlebars.compile(source);
    for (i = 0; i < bookArray.length; i++) {
        var newHTML = template({ Title: bookArray[i].title, Authors: bookArray[i].authors, Description: bookArray[i].description, Img: bookArray[i].img });
        appendTo.append(newHTML);
    }
}

$('.search1').on('click', function () {
    var selected = $('input[name=optradio]:checked').val();
    var searchVal = $("#searchVal").val();
    var completeUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + selected + searchVal;
    fetch(completeUrl);
})

$('.book-list').on('click', '.book-container', function () {
    $(this).siblings().remove();
})