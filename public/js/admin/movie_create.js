;(function () {
  var movie_create_douban = $('#movie_douban_id');
  var movie_create_douban_btn = $('#movie_douban_btn');

  movie_create_douban_btn.on('click', function () {
    var id = movie_create_douban.val();
    if (id) {
      $.ajax({
        url: 'https://api.douban.com/v2/movie/subject/' + id,
        cache: true,
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        success: function (data) {
          $('#movie_title').val(data.title);
          $('#movie_original_title').val(data.original_title);
          $('#movie_year').val(data.year);
          // 导演
          var directors = [];
          for (var i = 0; i < data.directors.length; i++) {
            var director = data.directors[i].id + ':' + data.directors[i].name;
            directors.push(director);
          }
          $('#movie_directors').val(directors);
          // 演员
          var casts = [];
          for (var i = 0; i < data.casts.length; i++) {
            var cast = data.casts[i].id + ':' + data.casts[i].name;
            casts.push(cast);
          }
          $('#movie_casts').val(casts);
          $('#movie_categories').val(data.genres);
          $('#movie_countries').val(data.countries);
          $('#movie_aka').val(data.aka);
          $('#movie_images').val(data.images.small + ',' + data.images.large + ',' + data.images.medium);
          $('#movie_summary').val(data.summary);
          $('#movie_rating').val(data.rating.average);
        }
      });
    }
  });
})();
