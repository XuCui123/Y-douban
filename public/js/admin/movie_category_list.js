;(function () {
  $('.admin_movie_category_list_del').on('click', function (event) {
    var target = $(event.target);
    var id = target.data('id').replace('\"', '').replace('\"', '');
    var tr = $('.movie-category-id-' + id);

    $.ajax({
      type: 'DELETE',
      url: '/admin/category/list?id=' + id
    }).done( function (results) {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.remove();
        }
      }
    });
  });
})();
