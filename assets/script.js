//---------------------------------------------------------
//------------LAST FM API CALLS SECTION--------------------
//---------------------------------------------------------

var userInput;

function callAPI() {
  if ($("#track-btn").is(":checked")) {
    getTrackInfo(userInput);
  } else if ($("#artist-btn").is(":checked")) {
    getArtistInfo(userInput);
  }
}

function getTrackInfo(userInput) {
  userInput = $("#search-query").val();
  let trackURL =
    "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" +
    userInput +
    "&api_key=1cdcc6e0cda44cee6b6571363c390279&format=json";
  $.ajax({
    url: trackURL,
    method: "GET",
  }).then(function (response) {
    console.log("user searched for track: " + userInput);
    console.log(response);
  });
}

function getAlbumInfo() {
  let artist = $("#query-artist").val();
  let album = $("#query-album").val();
  let albumURL =
    "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cdcc6e0cda44cee6b6571363c390279&artist=" +
    artist +
    "&album=" +
    album +
    "&format=json";
  $.ajax({
    url: albumURL,
    method: "GET",
  }).then(function (response) {
    console.log("user searched for " + album + " by " + artist);
    console.log(response);
  });
}

function getArtistInfo(userInput) {
  userInput = $("#search-query").val();
  let artistURL =
    "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
    userInput +
    "&api_key=1cdcc6e0cda44cee6b6571363c390279&format=json";
  $.ajax({
    url: artistURL,
    method: "GET",
  }).then(function (response) {
    console.log("user searched for artist: " + userInput);
    console.log(response);
    $("#artist-name").text(response.artist.name);
    $("#artist-bio").html(response.artist.bio.summary);

    // Filling top 5 albums
    let topAlbumURL =
      "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
      userInput +
      "&api_key=1cdcc6e0cda44cee6b6571363c390279&format=json";
    $.ajax({
      url: topAlbumURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#header-img").attr(
        "src",
        response.topalbums.album[0].image[2]["#text"]
      );
      $("#header-img").attr("alt", response.topalbums.album[0].name);
      for (var i = 0; i < 3; i++) {
        console.log(response.topalbums.album[i].image[2]["#text"]);
        $("#albums>ul").append(
          "<img " +
            '" src="' +
            response.topalbums.album[i].image[2]["#text"] +
            'alt="' +
            response.topalbums.album[i].name +
            'class="responsive-img"' +
            '"/>' +
            "</li>"
        );
      }
    });
  });
}

//These apply on page load
$(function () {
  $("#search-icon").on("click", function () {
    var userInput = $("#search-query").val();
    console.log("user input is " + userInput);
    callAPI(userInput);
  });

  $("#album-search-icon").on("click", function () {
    getAlbumInfo();
  });

  $("#album-btn").on("click", function () {
    $("#default-search-input").hide(400);
    $("#album-search-input").show(400);
  });

  $(".default-query").on("click", function () {
    $("#default-search-input").show(400);
    $("#album-search-input").hide(400);
  });
});
