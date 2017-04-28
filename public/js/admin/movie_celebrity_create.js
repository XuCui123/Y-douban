;(function () {
  var movie_celebrity_create_douban = $('#movie_celebrity_douban');
  var movie_celebrity_create_douban_btn = $('#movie_celebrity_douban_btn');

  movie_celebrity_create_douban_btn.on('click', function () {
    var id = movie_celebrity_create_douban.val();
    if (id) {
      $.ajax({
        url: 'https://api.douban.com/v2/movie/celebrity/' + id,
        cache: true,
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        success: function (data) {
          $('#movie_celebrity_name').val(data.name);
          $('#movie_celebrity_name_en').val(data.name_en);
          $('#movie_celebrity_gender').val(data.gender);
          $('#movie_celebrity_born_place').val(data.born_place);
          $('#movie_celebrity_aka').val(data.aka);
          $('#movie_celebrity_aka_en').val(data.aka_en);
          $('#movie_celebrity_avatar').val(data.avatars.small + ',' + data.avatars.large + ',' + data.avatars.medium);
          var works = [];
          for (var i = 0; i < data.works.length; i++) {
            works.push(data.works[i].subject.id);
          }
          $('#movie_celebrity_works').val(works);
        }
      });
    }
  });
})();
