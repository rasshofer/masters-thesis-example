# Masters Thesis Example

> A simple calculator Web application to demonstrate a CI setup

I built this Web application to demonstrate testing using CI for my masters thesis (»Improving software quality of web applications with continuous integration and continuous deployment«). It’s not exactly setting the world on fire but may be useful for some of you to get started with CI of Web applications.

[![Build Status](https://travis-ci.org/rasshofer/masters-thesis-example.png)](https://travis-ci.org/rasshofer/masters-thesis-example) [![Dependency Status](https://gemnasium.com/rasshofer/masters-thesis-example.svg)](https://gemnasium.com/rasshofer/masters-thesis-example) [![Code Climate](https://codeclimate.com/github/rasshofer/masters-thesis-example.png)](https://codeclimate.com/github/rasshofer/masters-thesis-example)

## Basic information and features

- RequireJS
- Unit testing running within PhantomJS (via Jasmine)
- Generation and validation of several metrics like McCabe's cyclomatic complexity or LOC (via complexity-report, sloc)
- Copy/paste detection (via jscpd)
- Code style checks (via ESLint, JSCS, SCSS Lint)
- Code coverage (via Intern/istanbul)
- Generation of documentation (via JSDoc)
- Automatic pre-commit Git hook running all tests for each commit
- Production-ready assets (via htmlmin, cssmin, UglifyJS)

## Grunt tasks

### `grunt test`

Runs all tests.

### `grunt docs`

Generation of documentation.

### `grunt coverage`

Generation of code coverage.

### `grunt all`

Run all tasks named above at once.

## Jenkins

I’m using a dockerized version of Jenkins to run execute all relevant tests for each Git commit. I published my approach of such a dockerized CI environment at [rasshofer/dockerized-jenkins](https://github.com/rasshofer/dockerized-jenkins).

## Travis / Code Climate

To demonstrate the services provided by Travis and Code Climate, this repository also gets built on Travis’ CI environment for each Git commit and analyzed by Code Climate. You can find the results at [https://travis-ci.org/rasshofer/masters-thesis-example](https://travis-ci.org/rasshofer/masters-thesis-example) and [https://codeclimate.com/github/rasshofer/masters-thesis-example](https://codeclimate.com/github/rasshofer/masters-thesis-example).

## Run tests via Docker

You may also want to run the tests just like my Jenkins environment does by building the `Dockerfile` within this repository.


```sh
docker build -t rasshofer/masters-thesis-example .
```

## Changelog

* 0.0.1
	* Initial version

## License

Copyright (c) 2015 [Thomas Rasshofer](http://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
