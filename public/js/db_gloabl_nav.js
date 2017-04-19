;(function () {
  'use strict';

  $('.nav-user-account').on('click', function () {
    $('.nav-user-account').toggleClass('more-active');
  });

  $('.link-remind').on('click', function () {
    $('.top-nav-reminder').toggleClass('more-active');
  });

  $('.top-nav-doubanapp').hover( function () {
    $('.top-nav-doubanapp').addClass('more-active');
  }, function () {
    $('.top-nav-doubanapp').removeClass('more-active');
  })

})();
