
class Movie {
    constructor(id, title, posterPath) {
        this.id = id;
        this.title = title;
        this.posterPath = posterPath;
    }

    setSource(apiKey, urlBase, imgUrlBase){
        this.apiKey = apiKey;
        this.urlBase = urlBase;
        this.imgUrlBase = imgUrlBase;
    }

    fetchDetailsAndAppendTo(displayLoc, titleLoc, overviewLoc) {
        var movieUrl = this.urlBase+this.id+"?api_key="+this.apiKey;
        var self = this;
        $.ajax({
            type: "GET",
            url: movieUrl,
            dataType: "jsonp",
            success: function (data) {
              self.title = data.title;
              self.overview = data.overview;
              self.posterPath = self.imgUrlBase+data.poster_path;
              self.appendTo(displayLoc);
              $("#"+titleLoc).html(data.title);
              $("#"+overviewLoc).html(data.overview);
              $( ".movieThumbnail" ).after( $( "#"+overviewLoc ) );
            },
            error: function (data, textStatus, errorThrown) {
              $("body").append("Failed to get data with " + errorThrown + " -> " + textStatus);
            }
          });

    }

    display(displayLoc, titleLoc, overviewLoc) {
        if (this.posterPath === undefined){
            this.fetchDetailsAndAppendTo(displayLoc, titleLoc, overviewLoc);
        }
        else{
            this.appendTo(displayLoc);
        }
    }

    appendTo(displayLoc){
        var divString = '<div class="movieThumbnail" ';
        divString += 'onclick="Movie.loadPage('+this.id+')"';
        divString += 'style="background-image: url(' + this.posterPath + ');" ></div>';
        $(divString).appendTo(displayLoc);
    }

    static loadPage(id){
        window.location.href = "moviedetails.html?movieId="+id;
    }
}

window.module = window.module || {};
module.exports = Movie;
