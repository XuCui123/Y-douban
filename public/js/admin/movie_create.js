;(function () {
  var movie_create_douban = $('#movie_douban');
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
          $('#movie_name').val(data.title);
          $('#movie_director').val(data.directors[0].name);
          $('#movie_actor').val(data.casts[0].name);
          $('#movie_categories').val(data.genres);
          $('#movie_country').val(data.countries);
          $('#movie_year').val(data.year);
          $('#movie_alias').val(data.aka);
        }
      });
    }
  });
})();
