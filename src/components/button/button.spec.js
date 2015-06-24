'use strict';

/* global define, describe, it, beforeEach, afterEach, expect */
define([
  'jquery',
  'tpl!components/button/button.tpl.html'
], function ($, template) {

  describe('Button Component', function () {

    describe('DOM', function () {

      var $button;

      beforeEach(function () {
        $button = $(template({
          label: 'Test'
        })).appendTo(document.body);
      });

      it('should trigger the custom `button.click` event when clicking the button', function () {

        var events = 0;

        $button.on('button.click', function () {
          events++;
        });

        $button.trigger('click');

        expect(events).toBe(1);

      });

      it('should have the class `clicked` after being clicked', function () {

        $button.trigger('click');

        expect($button.hasClass('clicked')).toBe(true);

      });

      afterEach(function () {
        $button.remove();
      });

    });

  });

});
