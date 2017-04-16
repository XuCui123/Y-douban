;(function () {
  'use strict';

  // 区号弹出层，地区弹出层
  var chooseDistrict = $('.js-choose-district');
  var districtDialog = $('#dui-dialog0');
  var chooseLocation = $('.js-choose-location');
  var locationDialog = $('#dui-dialog1');
  var closeDialog = $('.dui-dialog-close');
  var dialogMask = $('.dui-dialog-mask');
  var maskHeight = $(document.body).height();
  var phoneList = $('.phone-list');
  var locationList = $('#l_tabs');

  // 区号选择弹出层控制
  chooseDistrict.on('click', function () {
    districtDialog.show();
    dialogMask.css("height", maskHeight);
    dialogMask.show();
  });

  closeDialog.on('click', function () {
    locationDialog.hide();
    districtDialog.hide();
    dialogMask.hide();
  });

  // 地区选择弹出层控制
  chooseLocation.on('click', function () {
    locationDialog.show();
    dialogMask.css("height", maskHeight);
    dialogMask.show();
  });

  // 区号选择之后处理
  phoneList.on('click', function (event) {
    var phone;
    var list = phoneList.children('li');

    for (var i = 0; i < list.length; i++) {
      $(list[i]).removeClass('is-active');
    }

    if (event.target.nodeName === 'LI') {
      phone = event.target;
    } else {
      phone = $(event.target).parents('li')[0];
    }
    var content = $(phone).children('.item-number').html();
    chooseDistrict.html(content);
    $('#phone').val(content)
    $(phone).addClass('is-active');

    districtDialog.hide();
    dialogMask.hide();
  });

  // 地区列表的切换
  locationList.on('click', function (event) {
    var location = $(event.target);
    var list = locationList.children('li');
    var p_directly = $('#p_directly');
    var p_china = $('#p_china');
    var p_zone = $('#p_zone');

    for (var i = 0; i < list.length; i++) {
      $(list[i]).removeClass('selected');
    }

    if (location.attr('id') === 'a_china') {
      location.parent().addClass('selected');
      p_directly.hide();
      p_zone.hide();
      p_china.show();
    } else if (location.attr('id') === 'a_zone') {
      location.parent().addClass('selected');
      p_directly.hide();
      p_zone.show();
      p_china.hide();
    } else if (location.attr('id') === 'a_directly') {
      location.parent().addClass('selected');
      p_directly.show();
      p_zone.hide();
      p_china.hide();
    }
  });

  // 城市选择
  var panelCity = $('.panel');
  panelCity.on('click', function (event) {
    var city = $(event.target);
    if (city.attr('class') === 'habitable') {
      var cityName = city.html();
      $('.loc .location').html(cityName);
      $('.js-choose-location').html('重新选择');
      dialogMask.hide();
      locationDialog.hide();
      $('#address').val(cityName);
    }
  });

  // 检查表单的合法性
  var email = $('#email');
  var password = $('#password');
  var nickname = $('#nickname');
  var phone = $('#phone_num');
  var code = $('#code');

  email.focus(function () {
    email.next().hide();
  })

  email.blur(function () {
    var reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (!reg_email.test(email.val())) {
      email.next().html('请输入正确格式的邮箱！');
      email.next().show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/register/email?email=' + email.val()
      }).done(function (results) {
        if (results.success === 1) {
          email.next().html('邮箱已经存在了');
          email.next().show();
        }
      });
    }
  })

  password.focus(function () {
    password.next().next().hide();
    password.next().show();
  });

  password.blur(function () {
    password.next().hide();
    if (password.val() === '') {
      password.next().next().html('密码不能为空')
      password.next().next().show();
    } else if (password.val().length < 8 || password.val().match(/\d/) === null || password.val().match(/[A-Za-z]/) === null) {
      password.next().next().html('请输入长度至少为八位的字母数字组合密码');
      password.next().next().show();
    }
  });

  nickname.focus(function () {
    nickname.next().next().hide();
    nickname.next().show();
  });

  nickname.blur(function () {
    nickname.next().hide();
    if (nickname.val() === '') {
      nickname.next().next().html('名号不能为空');
      nickname.next().next().show();
    } else if (nickname.val().length < 7 || nickname.val().length > 14) {
      nickname.next().next().html('名号请保持在7-14个字符之间');
      nickname.next().next().show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/register/nickname?nickname=' + nickname.val()
      }).done(function (results) {
        if (results.success === 1) {
          nickname.next().next().html('名号已经存在了！');
          nickname.next().next().show();
        }
      });
    }

  });

  phone.focus(function () {
    phone.next().next().hide();
  });

  phone.blur(function () {
    if (!/^1[34578]\d{9}$/.test(phone.val())) {
      phone.next().next().html('请输入正确的手机号');
      phone.next().next().show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/register/phone?phone=' + phone.val()
      }).done(function (results) {
        if (results.success === 1) {
          phone.next().next().html('手机号已经注册过了！');
          phone.next().next().show();
        }
      });
    }
  });

  code.blur(function () {
    if (code.val() === '' || $('.phone-code-right .code').html() !== code.val()) {
      $('.phone-code-right').hide();
      $('.phone-code-error').show();
    }
  });

  // 验证码
  var phoneCodeBtn = $('.phone-code-btn');
  var phone_prefix = $('#phone').val();

  phoneCodeBtn.on('click', function () {
    $('.phone-code-error').hide();
    var phone_num = $('#phone_num').val();
    var phone_reg = /^1[34578]\d{9}$/;

    $('#phone').val(phone_prefix + phone_num);
    // 请求验证码
    if (!phone_reg.test(phone_num)) {
      $('.phone-error').show();
    } else {
      $('.phone-error').hide();
      $.ajax({
        type: 'GET',
        url: '/register/phonecode'
      }).done(function (results) {
        if (results.success === 1) {
          var code = results.data;
          $('.phone-code-right .code').html(code);
          $('.phone-code-right').show();
        }
      });
    }

  });

  // 控制提交按钮
  var agreementCheckBox = $('#agreement');
  var btnSubmit = $('.btn-submit.disabled');

  if (btnSubmit.attr('class').indexOf('enabled') === -1) {
    btnSubmit.attr('disabled', 'disabled');
  }

  agreementCheckBox.on('click', function () {
    btnSubmit.toggleClass('enabled');
    btnSubmit.removeAttr('disabled');
    if (btnSubmit.attr('class').indexOf('enabled') === -1) {
      btnSubmit.attr('disabled', 'disabled');
    }
  });

})();
