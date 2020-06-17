$(document).ready(() => {
  $("#searchBtn").on("click", event => {
    event.preventDefault();
    const title = $("#search")
      .val()
      .trim();
    const queryURL = "https://www.omdbapi.com/?t=" + title + "&apikey=cd2db0c6";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(data => {
      $("#resultRow").html("");
      const resultDiv = $("<div>");
      resultDiv.addClass("card");
      $("#resultRow").append(resultDiv);

      const resultCard = $("<div>");
      resultCard.addClass("card-body");
      resultDiv.append(resultCard);

      const resultCardImage = $("<img>");
      resultCardImage.addClass("image");
      resultCardImage.attr("src", data.Poster);
      resultDiv.append(resultCardImage);

      const resultCardTitle = $("<p>");
      resultCardTitle.text(`${data.Title}`);
      resultCardTitle.addClass("card-title");
      resultDiv.append(resultCardTitle);

      const resultCardYear = $("<p>");
      resultCardYear.text(`Releaseed Year: ${data.Year}`);
      resultCardTitle.addClass("card-text year");
      resultDiv.append(resultCardYear);

      const resultCardGenre = $("<p>");
      resultCardGenre.text(`Genre(s): ${data.Genre}`);
      resultCardTitle.addClass("card-text genre");
      resultDiv.append(resultCardGenre);

      const resultCardPlot = $("<p>");
      resultCardPlot.text(`Plot: ${data.Plot}`);
      resultCardTitle.addClass("card-text plot");
      resultDiv.append(resultCardPlot);

      const resultCardRating = $("<p>");
      const ratings = JSON.stringify(data.Ratings[1].Value);
      resultCardRating.text(`Rotten Tomatoes Rating: ${ratings}`);
      resultCardRating.addClass("card-text");
      resultDiv.append(resultCardRating);

      const favouriteButton = $("<button>");
      favouriteButton.text("Add To Favourites");
      favouriteButton.addClass("cardButton");
      favouriteButton.attr("id", "favBtn");
      resultDiv.append(favouriteButton);

      console.log(data);
    });
  });
  $("ul").on("click", "button", event => {
    event.preventDefault();
    const pressedButton = $(event.target);
    $.ajax(`/api/movies/${pressedButton.data("id")}`, {
      method: "DELETE"
    }).then(() => {
      location.reload();
    });
  });
  $("#resultRow").on("click", "button", event => {
    event.preventDefault();
    const movieData = {
      title: $(".card-title").text()
    };
    console.log(movieData);
    console.log("this");
    $.ajax({
      url: "/api/movies",
      method: "POST",
      data: movieData
    }).then(() => {
      location.reload();
    });
  });
});
