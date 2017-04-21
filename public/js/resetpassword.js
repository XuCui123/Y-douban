;(function () {
  'use strict';

  var reset_password_email = $('#reset_password_email');

  reset_password_email.focus(function () {
    $('.validate-error').hide();
    $('.validate-option').show();
  });

  reset_password_email.blur(function () {
    $('.validate-option').hide();

    if (reset_password_email.val() === '') {
      $('.validate-error').html('Email地址或手机号码不能为空');
      $('.validate-error').show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/resetpassword/validate?email=' + reset_password_email.val()
      }).done(function (results) {
        if (results.success === 0) {
          $('.validate-error').html('Email或手机号不存在！');
          $('.validate-error').show();
        }
      });
    }
  });

})();
