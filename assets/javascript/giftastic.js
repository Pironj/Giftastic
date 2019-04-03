$(document).ready(function(){


    var animes = ["Dragon Ball Z", "Ghost In The Shell"];



    // Function for dumping the JSON content for each button into the div
    function displayAnimeGif() {
        // "https://api.giphy.com/v1/gifs/search?api_key=O2jvreeTnbX3pepuGVnw3cT7VonBEehw&q=anime&limit=10&offset=0&rating=G&lang=en"
        $("#gif-view").empty();
        // Here we are building the URL we need to query the database
        var gif = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=O2jvreeTnbX3pepuGVnw3cT7VonBEehw&q=" + gif + "&limit=10&offset=0&rating=G&lang=en";

        // We then created an AJAX call
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var stillURL = response.data[i].images.fixed_height_still.url;
                var animateURL = response.data[i].images.fixed_height.url;
                var wrapperDiv = $("<div>");
                var animeGif = $("<img>");
                console.log(stillURL)
                var rating = response.data[i].rating;
                var favorite = $("<button class='favorite'>").text("Save");
                favorite.attr("stillGif", stillURL);
                favorite.attr("animateGif", animateURL);
                var displayRating = $("<p class=''>").text("Rating: " + rating);

                animeGif.attr("src", stillURL);
                animeGif.attr("alt", "searched gif image");
                animeGif.attr("still-gif", stillURL);
                animeGif.attr("animate-gif", animateURL);
                animeGif.addClass("gif");
                animeGif.attr("data-state", "still");
                $(wrapperDiv).addClass("embed-responsive-item");
                $(wrapperDiv).append(animeGif, displayRating, favorite);
                $("#gif-view").append(wrapperDiv);
            }
        });
    }
    // function puts our searched terms into buttons on our page at button-view div.
    function renderButtons() {
        // Deleting the buttons prior to adding new ones
        $("#buttons-view").empty();

        // Looping through the our array above of searched anime
        for (var i = 0; i < animes.length; i++) {
            // create a variable to store our new button
            var newBtn = $("<button>");
            // Adding a class of anime-btn to our button
            newBtn.addClass("anime-btn btn btn-info");
            // Adding a data-attribute
            newBtn.attr("data-name", animes[i]);
            // Providing the initial button text
            newBtn.text(animes[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(newBtn);

        }
    }

    // event handler for button clicks
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var anime = $("#anime-input").val().trim();
        if (anime !== "") {
            // add the searched item to our array
            animes.push(anime);
        } else {
            alert("type words before clicking the button");
        }

        // calling our button creation function.
        renderButtons();
    });

    // Generic function for displaying the GifInfo
    $(document).on("click", ".anime-btn", displayAnimeGif);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    //Function to play gif images.
    $(document).on("click", ".gif", function () {
        var state = $(this).attr('data-state');
        console.log("click")

        if (state === "still") {
            var animate = $(this).attr('animate-gif');
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        } else {
            var still = $(this).attr('still-gif');
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });

    // click handler to save gif
    $(document).on("click", ".favorite", function (event) {
        console.log(event.target.attributes)
        var gifA = event.target.attributes.animategif.nodeValue;
        var gifS = event.target.attributes.stillgif.nodeValue;
        localStorage.setItem("fav-gif", gifA);
        localStorage.setItem("fav-gif-s", gifS);
        var favImg = $("<img>");
        var favDiv = $("<div>");
        favImg.attr("src", gifS);
        favImg.attr("alt", "searched gif image");
        favImg.attr("still-gif", gifS);
        favImg.attr("animate-gif", gifA);
        favImg.addClass("gif");
        favImg.attr("data-state", "still");
        favImg.attr("")
        $(favDiv).addClass("embed-responsive-item");
        $(favDiv).append(favImg);

        $("#favorite").append(favDiv);

    });
});