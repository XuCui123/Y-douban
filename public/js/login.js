;(function () {
  var switch_username_login_way = $('#switch_username_login_way');
  var switch_phonecode_login_way = $('#switch_phonecode_login_way');

  switch_username_login_way.on('click', function () {
    $('#username_login').hide();
    $('#phonecode_login').show();
  });

  switch_phonecode_login_way.on('click', function () {
    $('#username_login').show();
    $('#phonecode_login').hide();
  });

})();
