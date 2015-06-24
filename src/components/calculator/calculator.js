'use strict';

/* global define */
define([
  'jquery',
  'services/calculator/calculator'
], function ($, Calculator) {

  var component = 'calculator';

  var calculate = function ($component) {

    var operation = $component.find('option:selected').val();

    var x = parseFloat($component.find('[name="x"]').val());
    var y = parseFloat($component.find('[name="y"]').val());

    var calculator = new Calculator(x, y);

    var result = calculator.calculate(operation) || '';

    $component.find('[name="z"]').val(result);

  };

  $(document).on('change', '.' + component + ' [name="operation"]', function (e) {

    e.preventDefault();

    var $this = $(this);
    var $component = $this.closest('.' + component);

    calculate($component);

  }).on('click', '.' + component + ' [name="equals"]', function (e) {

    e.preventDefault();

    var $this = $(this);
    var $component = $this.closest('.' + component);

    calculate($component);

  });

});
