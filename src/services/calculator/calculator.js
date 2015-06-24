'use strict';

/* global define */
define([], /** @lends Calculator */ function () {

  /**
   * Represents a calculator.
   * @constructor
   * @param {number} x - The first number to work with
   * @param {number} y - The second number to work with
   */
  function Calculator(x, y) {
    /** @private */ this.x = parseFloat(x);
    /** @private */ this.y = parseFloat(y);
  }

  /**
   * Adds the two numbers.
   * @this {Calculator}
   * @returns {number} The result.
   */
  Calculator.prototype.add = function () {
    return this.x + this.y;
  };

  /**
   * Subtracts the two numbers.
   * @this {Calculator}
   * @returns {number} The result.
   */
  Calculator.prototype.subtract = function () {
    return this.x - this.y;
  };

  /**
   * Multiplies the two numbers.
   * @this {Calculator}
   * @returns {number} The result.
   */
  Calculator.prototype.multiply = function () {
    return this.x * this.y;
  };

  /**
   * Divides the two numbers.
   * @this {Calculator}
   * @returns {number} The result.
   */
  Calculator.prototype.divide = function () {
    if (this.y === 0) {
      return undefined;
    }
    return this.x / this.y;
  };

  /**
   * Takes a mathematical symbol and executes the matching method.
   * @this {Calculator}
   * @param {string} symbol - The mathematical symbol
   * @returns {number} The result.
   */
  Calculator.prototype.calculate = function (symbol) {
    if (symbol === '+') {
      return this.add();
    } else if (symbol === '-') {
      return this.subtract();
    } else if (symbol === '*') {
      return this.multiply();
    } else if (symbol === '/') {
      return this.divide();
    }
    return undefined;
  };

  return Calculator;

});
