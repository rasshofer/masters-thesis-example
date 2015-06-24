'use strict';

/* global define, describe, it, beforeEach, afterEach, expect */
define([
  'jquery',
  'tpl!components/calculator/calculator.tpl.html'
], function ($, template) {

  describe('Calculator Component', function () {

    describe('DOM', function () {

      var $form;

      beforeEach(function () {
        $form = $(template()).appendTo(document.body);
      });

      it('should execute the appropriate operation when changing the operation dropdown', function () {

        var x = 456;
        var y = 123;

        $form.find('[name="x"]').val(x);
        $form.find('[name="y"]').val(y);

        $form.find('[name="operation"]').val('-').trigger('change');

        var z = $form.find('[name="z"]').val();

        expect(parseInt(z, 10)).toEqual(333);

      });

      it('should execute the appropriate operation when clicking the equals button', function () {

        var x = 123;
        var y = 456;

        $form.find('[name="x"]').val(x);
        $form.find('[name="y"]').val(y);

        $form.find('[name="operation"]').val('+');
        $form.find('[name="equals"]').trigger('click');

        var z = $form.find('[name="z"]').val();

        expect(parseInt(z, 10)).toEqual(579);

      });

      afterEach(function () {
        $form.remove();
      });

    });

  });

});
