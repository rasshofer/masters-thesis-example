'use strict';

/* global define:false */
define([
  'intern!object',
  'intern/chai!assert',
  'require'
], function (registerSuite, assert, require) {

  // Register the suite
  registerSuite({

    name: 'coverage',

    jasmine: function () {

      // Overwrite the default timeout (node_modules/intern/lib/Test.js)
      this.timeout = 600000;

      var webDriver = this.remote;

      // Start testing
      webDriver.get(require.toUrl('jasmine.html'));

      // Wait until all tests finished (and jasmine displays the duration)
      webDriver.waitForElementByCss('.duration').execute(function () {

        var div;
        var divs = document.getElementsByTagName('div');
        var failedTests = [];

        for (var i = 0; i < divs.length; i++) {

          div = divs[i];

          if (div.className.indexOf('specDetail') >= 0 && div.className.indexOf('failed') >= 0) {
            /* global jQuery */
            failedTests.push(jQuery(div).text());
          }

        }

        return failedTests;

      }).then(function (fails) {

        var environmentName = [
          webDriver.environmentType.browserName,
          webDriver.environmentType.version,
          '(' + webDriver.environmentType.platform + ')'
        ].join(' ');


        if (webDriver.environmentType) {
          /* global console */
          console.log('\n' + environmentName + '\n');
        }

        // Log all failed tests if console.log is available
        for (var i = 0; i < fails.length; i++) {
          console.log(fails[i]);
        }

        // Verify that all tests passed with a verbose message in the console
        var messages = {
          pass: environmentName + ' - Jasmine executed all tests without errors',
          fail: environmentName + ' - Jasmine executed all tests but encountered ' + fails.length + ' errors'
        };

        assert.strictEqual(fails.length === 0 ? messages.pass : messages.fail, messages.pass);

        return webDriver.quit();

      });

      return webDriver;

    }

  });

});
