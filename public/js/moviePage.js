$(document).ready(() => {
  $("#searchBtn").on("click", event => {
    event.preventDefault();
    const title = $("#search")
      .val()
      .trim();
    $.ajax(`/api/omdb/${title}`, {
      method: "GET"
    }).then(data => {
      $("#resultRow").empty();
      const movieCard = `
      <div class="card>
        <div class="card-body">
          <img src="${data.Poster} alt="Picture of ${data.Title}" />
          <h2 class="card-title">${data.Title}</h2>
          <p class="card-text">Released Year: <span class="year">${data.Year}</span></p>
          <p class="card-text">Genre(s): <span class="genre">${data.Genre}</span></p>
          <p class="card-text">Plot: <span class="plot">${data.Plot}</span></p>
          <p class="card-text">Rotten Tomato Rating: <span class="rating">${data.Ratings[1].Value}</span>/100</p>
          <button id="favBtn" data-toggle="modal" data-target="#myModal" class="cardButton">Add  To Favorites</button>
        </div>
      </div>`;
      $("#resultRow").append(movieCard);
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
  $("#saveBtn").on("click", async event => {
    event.preventDefault();
    const { id } = await $.get("/api/user_data");
    console.log($("#reason").text());
    const movieData = {
      title: $(".card-title").text(),
      favorite: 1,
      reason: $("#reason")
        .val()
        .trim(),
      rating: parseInt($(".rating").text()),
      year: $(".year").text(),
      UserId: id
    };
    $.ajax({
      url: "/api/movies",
      method: "POST",
      data: movieData
    }).then(() => {
      location.reload();
    });
  });
});
