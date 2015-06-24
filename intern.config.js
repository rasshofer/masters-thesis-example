/* global define */
define({

  proxyPort: 9093,
  proxyUrl: 'http://localhost:9093/',

  capabilities: {
      'selenium-version': '2.45.0'
  },

  tunnel: 'NullTunnel',

  environments: [{
    browserName: 'phantomjs'
  }],

  maxConcurrency: 3,
  useSauceConnect: false,

  // Connection information for the remote WebDriver service
  webdriver: {
      host: 'localhost',
      port: 9092
  },

  // Non-functional test suite(s) to run in each browser
  suites: [

  ],

  // Functional test suite(s) to run in each browser once non-functional tests are completed
  functionalSuites: [
    'src/helpers/intern.js'
  ],

  // A regular expression matching URLs to files that should not be included in code coverage analysis
  excludeInstrumentation: /(^(?!src\/)|^src\/vendor|jasmine.js|\.spec\.js$)/

});
