;(function () {
  $('.admin_movie_celebrity_list_del').on('click', function (event) {
    var target = $(event.target);
    var id = target.data('id').replace('\"', '').replace('\"', '');
    var tr = $('.movie-celebrity-id-' + id);

    $.ajax({
      type: 'DELETE',
      url: '/admin/celebrity/list?id=' + id
    }).done( function (results) {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.remove();
        }
      }
    });
  });
})();
