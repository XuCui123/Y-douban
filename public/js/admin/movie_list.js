;(function () {
  $('.admin_movie_list_del').on('click', function (event) {
    var target = $(event.target);
    var id = target.data('id').replace('\"', '').replace('\"', '');
    var tr = $('.movie-id-' + id);
    console.log(target, id, tr);
    $.ajax({
      type: 'DELETE',
      url: '/admin/movie/list?id=' + id
    }).done( function (results) {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.remove();
        }
      }
    });
  });
})();
