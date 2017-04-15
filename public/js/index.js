;(function () {
  'use strict';

  var expand_qr = $("#expand-qr");

  expand_qr.hover(function () {
    expand_qr.addClass('open');
  }, function () {
    expand_qr.removeClass('open');
  });

})();
