;(function () {
  'use strict';

  // 区号弹出层，地区弹出层
  var register_close_dialog = $('.dui-dialog-close');
  var register_dialog_mask = $('.dui-dialog-mask');
  var register_mask_height = $(document.body).height();
  var register_choose_district = $('.district-choose-hook');
  var register_district_dialog = $('#dui-dialog0');
  var register_choose_location = $('.location-choose-hook');
  var register_location_dialog = $('#dui-dialog1');
  var register_location_list = $('#location_tabs');
  var register_phone_list = $('.phone-list');


  // 区号选择弹出层控制
  register_choose_district.on('click', function () {
    register_district_dialog.show();
    register_dialog_mask.css("height", register_mask_height);
    register_dialog_mask.show();
  });

  // 弹出层关闭按钮
  register_close_dialog.on('click', function () {
    register_district_dialog.hide();
    register_location_dialog.hide();
    register_dialog_mask.hide();
  });

  // 地区选择弹出层控制
  register_choose_location.on('click', function () {
    register_location_dialog.show();
    register_dialog_mask.css("height", register_mask_height);
    register_dialog_mask.show();
  });

  // 区号选择之后处理
  register_phone_list.on('click', function (event) {
    var phone;
    var phone_list = register_phone_list.children('li');

    for (var i = 0; i < phone_list.length; i++) {
      $(phone_list[i]).removeClass('is-active');
    }

    if (event.target.nodeName === 'LI') {
      phone = event.target;
    } else {
      phone = $(event.target).parents('li')[0];
    }
    var phone_content = $(phone).children('.item-number').html();
    register_choose_district.html(phone_content);
    $('#phone').val(phone_content)
    $(phone).addClass('is-active');

    register_district_dialog.hide();
    register_dialog_mask.hide();
  });

  // 地区列表的切换
  register_location_list.on('click', function (event) {
    var location = $(event.target);
    var location_list = register_location_list.children('li');
    var p_directly = $('#p_directly');
    var p_china = $('#p_china');
    var p_zone = $('#p_zone');

    for (var i = 0; i < location_list.length; i++) {
      $(location_list[i]).removeClass('selected');
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
  var register_panel_city = $('.panel');
  register_panel_city.on('click', function (event) {
    var city = $(event.target);
    if (city.attr('class') === 'habitable') {
      var city_name = city.html();
      $('.loc em').html(city_name);
      $('.location-choose-hook').html('重新选择');
      register_dialog_mask.hide();
      register_location_dialog.hide();
      $('#address').val(city_name);
    }
  });

  // 检查表单的合法性
  var register_email_input = $('#email');
  var register_password_input = $('#password');
  var register_nickname_input = $('#nickname');
  var register_phone_input = $('#phone_num');
  var register_code_input = $('#code');

  register_email_input.focus(function () {
    register_email_input.next().hide();
  });

  register_email_input.blur(function () {
    var register_email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (register_email_input.val() === '') {
      register_email_input.next().html('邮箱不能为空');
      register_email_input.next().show();
    }else if (!register_email_reg.test(register_email_input.val())) {
      register_email_input.next().html('请输入正确格式的邮箱！');
      register_email_input.next().show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/register/email?email=' + register_email_input.val()
      }).done(function (results) {
        if (results.success === 1) {
          register_email_input.next().html('邮箱已经存在了');
          register_email_input.next().show();
        }
      });
    }
  });

  register_password_input.focus(function () {
    register_password_input.next().next().hide();
    register_password_input.next().show();
  });

  register_password_input.blur(function () {
    register_password_input.next().hide();
    if (register_password_input.val() === '') {
      register_password_input.next().next().html('密码不能为空')
      register_password_input.next().next().show();
    } else if (register_password_input.val().length < 8 || register_password_input.val().match(/\d/) === null || register_password_input.val().match(/[A-Za-z]/) === null) {
      register_password_input.next().next().html('请输入长度至少为八位的字母数字组合密码');
      register_password_input.next().next().show();
    }
  });

  register_nickname_input.focus(function () {
    register_nickname_input.next().next().hide();
    register_nickname_input.next().show();
  });

  register_nickname_input.blur(function () {
    register_nickname_input.next().hide();
    if (register_nickname_input.val() === '') {
      register_nickname_input.next().next().html('名号不能为空');
      register_nickname_input.next().next().show();
    } else if (register_nickname_input.val().length < 7 || register_nickname_input.val().length > 14) {
      register_nickname_input.next().next().html('名号请保持在7-14个字符之间');
      register_nickname_input.next().next().show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/register/nickname?nickname=' + register_nickname_input.val()
      }).done(function (results) {
        if (results.success === 1) {
          register_nickname_input.next().next().html('名号已经存在了！');
          register_nickname_input.next().next().show();
        }
      });
    }
  });

  register_phone_input.focus(function () {
    register_phone_input.next().next().hide();
  });

  register_phone_input.blur(function () {
    if (!/^1[34578]\d{9}$/.test(register_phone_input.val())) {
      register_phone_input.next().next().html('请输入正确的手机号');
      register_phone_input.next().next().show();
    } else {
      $.ajax({
        type: 'PUT',
        url: '/register/phone?phone=' + register_phone_input.val()
      }).done(function (results) {
        if (results.success === 1) {
          register_phone_input.next().next().html('手机号已经注册过了！');
          register_phone_input.next().next().show();
        }
      });
    }
  });

  register_code_input.blur(function () {
    if (register_phone_input.val() === '' || $('.phone-code-right .code').html() !== register_code_input.val()) {
      $('.phone-code-right').hide();
      $('.phone-code-error').show();
    }
  });

  // 验证码
  var register_get_phone_code_btn = $('.phone-code-btn');

  register_get_phone_code_btn.on('click', function () {
    $('.phone-code-error').hide();
    var phone_num = $('#phone_num').val();
    var phone_reg = /^1[34578]\d{9}$/;

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
  var register_agreement_checkBox = $('#agreement');
  var register_btn_submit = $('.register-submit-btn');

  if (register_btn_submit.attr('class') && register_btn_submit.attr('class').indexOf('enabled') === -1) {
    register_btn_submit.attr('disabled', 'disabled');
  }

  register_agreement_checkBox.on('click', function () {
    register_btn_submit.toggleClass('enabled');
    register_btn_submit.removeAttr('disabled');
    if (register_btn_submit.attr('class').indexOf('enabled') === -1) {
      register_btn_submit.attr('disabled', 'disabled');
    }
  });

})();
