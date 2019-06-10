
class MovieBrowser {
  constructor(apiKey, urlBase, imgUrlBase) {
    this.apiKey = apiKey;
    this.urlBase = urlBase;
    this.imgUrlBase = imgUrlBase;
  }

  display() {
    var movieDetails = this.loadTitlesAndDisplay();
  }

  loadTitlesAndDisplay() {
    var self = this;
    $.ajax({
      type: "GET",
      url: this.urlBase + "popular?api_key=" + this.apiKey,
      dataType: "jsonp",
      success: function (data) {
        self.generateMovieThumbnails(data.results);
      },
      error: function (data, textStatus, errorThrown) {
        $("body").append("Failed to get data with " + errorThrown + " -> " + textStatus);
      }
    });
  }

  generateMovieThumbnails(movieDetails) {
    var titles = movieDetails.map(d => d.title);
    var IDs = movieDetails.map(d => d.id);
    var posterPaths = movieDetails.map(d => this.imgUrlBase + d.poster_path);

    for (var i = 0; i < IDs.length; i++) {
      var movie = new Movie(IDs[i], titles[i], posterPaths[i]);
      movie.display("body");
    }
  }
}

window.module = window.module || {};
module.exports = MovieBrowser;
