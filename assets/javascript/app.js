//Initial array of movies	
$(document).ready(function() {

    var movieStart = ["Step Brothers", "Wedding Crashers", "Old School", "Christmas Vacation", "Superbad", "Pinapple Express", "The Departed", "Meet the Parents", "Tropic Thunder", "The Town"];	
  
    //  create movieStart array buttons
    function renderButtons(){
      $('#buttons-view').empty();
  
      for (var i = 0; i < movieStart.length; i++) {
              //create all buttons
              var a = $('<button>');
              a.addClass('movie-btn');
              a.attr('data-name', movieStart[i]);
              a.text(movieStart[i]);
              $('#buttons-view').append(a);
            }
          }    
          renderButtons();
  
  //on button click
  $(document).on('click', '.movie-btn', function() {
  
      //new variable will log the text data from each button
      var movieBtn = $(this).html(); 
      // console.log(movieBtn);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieBtn + "&api_key=dc6zaTOxFJmzC&limit=10";
      // console.log(queryURL);
  
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
          //console.log(results);
          //empties the div before adding more gifs
          $('#movies-view').empty();
          for ( var j=0; j < results.length; j++) {
                      var imageDiv = $('<div>');
                      var imageView = results[j].images.fixed_height.url;
                      var still = results[j].images.fixed_height_still.url;
                          // console.log(imageView);  
  
          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#movies-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each movie
          var rating = results[j].rating;
              // console.log(rating);
          var displayRated= $('<p>').text("Rating: " + rating);
          $('#movies-view').prepend(displayRated);
    } // end for loop
  
  }); // done response
  
          //function to stop and animate gifs
          function playGif() { 
                      var state = $(this).attr('data-state');
                      // console.log(state);
                   if (state == 'still'){
                       $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                   } else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                      }
  
                  } //end of on click function
  
        }); //end of document on click 
  
            //adding new button to array
          $(document).on('click', '#add-movie', function(){
              if ($('#movie-input').val().trim() == ''){
                alert('Please Search for an movie');
             }
             else {
              var movies = $('#movie-input').val().trim();
              movieStart.push(movies);
              $('#movie-input').val('');
              renderButtons();
              return false;
  
              }
  
          });
                        
  
          }); // end click function
  