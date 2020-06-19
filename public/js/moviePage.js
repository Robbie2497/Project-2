//Wait until the docyment loads
$(document).ready(() => {
  /*
    searchButton click Event
    Purpose: To query and render movie information
    parameters: click - event for searchBtn ID
                event - Call back function with event information
    Return: None
  */
  $("#searchBtn").on("click", event => {
    //Prevent page refresh
    event.preventDefault();
    //Grab user input for movie title
    const title = $("#search")
      .val()
      .trim();
    //ajax query to serverside giving movie information
    $.ajax(`/api/omdb/${title}`, {
      method: "GET"
    }).then(data => {
      //Empty html for resultRow ID
      $("#resultRow").empty();
      //Create Card with movie information
      const movieCard = `
      <!-- Start Movie Card-->
      <div class="card>
        <div class="card-body">
          <img src="${data.Poster} alt="Picture of ${data.Title}" />
          <h2 class="card-title">${data.Title}</h2>
          <p class="card-text">Released Year: <span class="year">${data.Year}</span></p>
          <p class="card-text">Genre(s): <span class="genre">${data.Genre}</span></p>
          <p class="card-text">Plot: <span class="plot">${data.Plot}</span></p>
          <p class="card-text">Rotten Tomato Rating: <span class="rating">${data.Ratings[1].Value}</span></p>
          <button id="favBtn" data-toggle="modal" data-target="#myModal" class="cardButton">Add  To Favorites</button>
        </div>
      </div>
      <!-- End Movie Card -->`;
      //add movie Card to the resultRow ID
      $("#resultRow").append(movieCard);
    }); //End ajax query
  }); //End searchButton click event
  /*
    ul button click Event(s)
    Purpose: To query query server side to delete item from database
    parameters: click - event for searchBtn ID
                button - tags for the clikc event
                event - Call back function with event information
    Return: None
  */
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
