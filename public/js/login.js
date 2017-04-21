;(function () {
  var login_switch_username_login_way = $('#switch_username_login_way');
  var login_switch_phonecode_login_way = $('#switch_phonecode_login_way');

  login_switch_username_login_way.on('click', function () {
    $('#username_login').hide();
    $('#phonecode_login').show();
  });

  login_switch_phonecode_login_way.on('click', function () {
    $('#username_login').show();
    $('#phonecode_login').hide();
  });

})();
