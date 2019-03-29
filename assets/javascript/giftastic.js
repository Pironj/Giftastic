document.ready(function(){

    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=O2jvreeTnbX3pepuGVnw3cT7VonBEehw";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });



























})