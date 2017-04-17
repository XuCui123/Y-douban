;(function () {
  'use strict';

  var email = $('#email');

  email.focus(function () {
    $('.validate-error').hide();
    $('.validate-option').show();
  });

  email.blur(function () {
    $('.validate-option').hide();

    if (email.val() === '') {
      $('.validate-error').html('Email地址或手机号码不能为空');
      $('.validate-error').show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/resetpassword/validate?email=' + email.val()
      }).done(function (results) {
        if (results.success === 0) {
          $('.validate-error').html('Email或手机号不存在！');
          $('.validate-error').show();
        }
      });
    }

  });

})();
