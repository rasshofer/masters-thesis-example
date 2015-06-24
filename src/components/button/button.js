'use strict';

/* global define */
define([
  'jquery'
], function ($) {

  var component = 'button';

  $(document).on('click', '.' + component, function (e) {

    e.preventDefault();

    var $this = $(this);

    $this.addClass('clicked').trigger('button.click');

  });

});
