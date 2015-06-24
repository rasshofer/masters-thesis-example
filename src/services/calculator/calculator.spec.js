'use strict';

/* global define, describe, it, spyOn, expect */
define([
  'jquery',
  'services/calculator/calculator'
], function ($, Calculator) {

  describe('Calculator Service', function () {

    describe('Methods', function () {

      it('should be able to add two numbers together', function () {

        var calculator = new Calculator(123, 456);

        var z = calculator.calculate('+');

        expect(z).toEqual(579);

      });

      it('should be able to subtract from a number', function () {

        var calculator = new Calculator(456, 123);

        var z = calculator.calculate('-');

        expect(z).toEqual(333);

      });

      it('should be able to multiply two numbers', function () {

        var calculator = new Calculator(123, 456);

        var z = calculator.calculate('*');

        expect(z).toEqual(56088);

      });

      it('should be able to divide by a number', function () {

        var calculator = new Calculator(500, 10);

        var z = calculator.calculate('/');

        expect(z).toEqual(50);

      });

      it('should return `undefined` when dividing by zero', function () {

        var calculator = new Calculator(500, 0);

        var z = calculator.calculate('/');

        expect(z).not.toBeDefined();

      });

      it('should return `undefined` when calling an invalid operation', function () {

        var calculator = new Calculator(123, 456);

        var z = calculator.calculate('$');

        expect(z).not.toBeDefined();

      });

    });

    describe('Spies', function () {

      it('should be able to call `add()` from `calculate()`', function () {

        var calculator = new Calculator(123, 456);

        spyOn(calculator, 'add');

        calculator.calculate('+');

        expect(calculator.add).toHaveBeenCalled();

      });

    });

  });

});
