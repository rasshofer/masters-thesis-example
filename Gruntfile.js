'use strict';

module.exports = function (grunt) {

  // Load package.json
  var pkg = grunt.file.readJSON('package.json');

  // Automatically load npm tasks from package.json
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('intern');

  // Project configuration
  grunt.initConfig({

    pkg: pkg,

    // Add browser prefixes
    autoprefixer: {
      options: {
        map: false,
        browsers: [
          '> 1%',
          'last 2 version'
        ]
      },
      dist: {
        expand: true,
        src: pkg.buildPath + '/app.css'
      }
    },

    // Clean up
    clean: {
      build: [
        pkg.buildPath
      ],
      docs: [
        pkg.docsPath
      ],
      reports: [
        pkg.reportsPath
      ],
      coverage: [
        pkg.coveragePath
      ]
    },

    // Cyclomatic Complexity
    complexity: {
      generic: {
        options: {
          breakOnErrors: true,
          errorsOnly: false,
          cyclomatic: 10,
          maintainability: 100,
          hideComplexFunctions: false,
          broadcast: false
        },
        src: [
          pkg.sourcePath + '/**/*.js',
          '!' + pkg.sourcePath + '/helpers/**/*.js',
          '!' + pkg.sourcePath + '/vendor/**/*.js'
        ]
      }
    },

    // Concatenation
    concat: {
      scss: {
        files: [{
          src: [
            pkg.sourcePath + '/reset.scss',
            pkg.sourcePath + '/components/**/*.scss'
          ],
          dest: pkg.tempPath + '/app.scss'
        }]
      }
    },

    // Local development server
    connect: {
      dev: {
        options: {
          port: pkg.devPort,
          hostname: '0.0.0.0'
        }
      },
      test: {
        options: {
          port: pkg.testPort,
          hostname: '0.0.0.0'
        }
      }
    },

    // Copy
    copy: {
      html: {
        src: pkg.sourcePath + '/index.html',
        dest: pkg.buildPath + '/index.html'
      }
    },

    // Minify CSS
    cssmin: {
      combine: {
        files: {
          '<%= pkg.buildPath %>/app.css': '<%= pkg.buildPath %>/app.css'
        }
      }
    },

    // JS Lint
    eslint: {
      options: {
        format: 'stylish'
      },
      grunt: [
        'Gruntfile.js'
      ],
      app: [
        pkg.sourcePath + '/**/*.js',
        '!' + pkg.sourcePath + '/vendor/**/*.js'
      ]
    },

    // Git Hooks
    githooks: {
      options: {
        args: '--no-color'
      },
      all: {
        'pre-commit': 'pre-commit'
      }
    },

    // Minify HTML
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= pkg.buildPath %>/index.html': '<%= pkg.buildPath %>/index.html'
        }
      }
    },

    // Intern
    intern: {
      build: {
        options: {
          config: 'intern.config',
          runType: 'runner',
          reporters: [
            'console',
            'lcovhtml'
          ]
        }
      }
    },

    // Jasmine
    jasmine: {
      build: {
        src: pkg.sourcePath + '/main.js',
        options: {
          styles: [
            pkg.buildPath + '/app.css'
          ],
          specs: [
            pkg.sourcePath + '/**/*.spec.js'
          ],
          host: 'http://127.0.0.1:' + pkg.testPort + '/',
          vendor: [
            pkg.sourcePath + '/vendor/jquery.js'
          ],
          outfile: 'jasmine.html',
          keepRunner: true,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: pkg.sourcePath + '/config.js',
            requireConfig: {
              baseUrl: pkg.sourcePath
            }
          }
        }
      }
    },

    // Code Duplicates
    jscpd: {
      build: {
        options: {
          'min-lines': 5,
          'min-tokens': 50
        },
        path: pkg.sourcePath,
        exclude: [
          'vendor/**'
        ]
      }
    },

    // JavaScript Coding Style
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      files: [
        pkg.sourcePath + '/**/*.js',
        '!' + pkg.sourcePath + '/vendor/**/*.js'
      ]
    },

    // JSDoc
    jsdoc: {
      build: {
        src: [
          pkg.sourcePath + '/**/*.js',
          '!' + pkg.sourcePath + '/vendor/**/*.js'
        ],
        options: {
          destination: pkg.docsPath
        }
      }
    },

    // PhantomJS
    phantom: {
      test: {
        options: {
          port: 9092
        }
      }
    },

    // RequireJS
    requirejs: {
      build: {
        options: {
          name: 'vendor/almond',
          include: 'main',
          baseUrl: pkg.sourcePath,
          mainConfigFile: pkg.sourcePath + '/config.js',
          out: pkg.buildPath + '/app.js',
          wrap: true,
          optimize: 'none'
        }
      }
    },

    // SCSS
    sass: {
      build: {
        options: {
          style: 'expanded',
          loadPath: [
            './',
            pkg.sourcePath
          ],
          sourcemap: 'none'
        },
        files: {
          '<%= pkg.buildPath %>/app.css': '<%= pkg.tempPath %>/app.scss'
        }
      }
    },

    // SCSS Lint
    scsslint: {
      allFiles: [
        pkg.sourcePath + '/**/*.scss',
        '!' + pkg.sourcePath + '/vendor/**/*.scss'
      ],
      options: {
        config: '.scss-lint.yml'
      }
    },

    // Lines Of Code
    sloc: {
      options: {
        reportType: 'stdout',
        reportDetail: 'detail'
      },
      js: {
        files: {
          './': [
            pkg.sourcePath + '/**/*.js',
            '!' + pkg.sourcePath + '/vendor/**/*.js'
          ]
        }
      }
    },

    // Minify JS
    uglify: {
      options: {
        compress: {
          'drop_console': true
        }
      },
      all: {
        files: {
          '<%= pkg.buildPath %>/app.js': '<%= pkg.buildPath %>/app.js'
        }
      }
    }

  });

  // CSS
  grunt.registerTask('css', [
    'concat:scss',
    'sass',
    'autoprefixer'
  ]);

  // Build
  grunt.registerTask('build', [
    'githooks',
    'clean:build',
    'requirejs:build',
    'copy:html',
    'css'
  ]);

  // Code Style
  grunt.registerTask('cs', [
    'clean:reports',
    'scsslint',
    'sloc',
    'jscpd',
    'eslint',
    'jscs',
    'complexity'
  ]);

  // Unit Tests
  grunt.registerTask('unit', [
    'connect:test',
    'jasmine'
  ]);

  // Tests
  grunt.registerTask('test', [
    'build',
    'cs',
    'unit'
  ]);

  // Code Coverage
  grunt.registerTask('coverage', [
    'clean:coverage',
    'phantom:test',
    'intern:build'
  ]);

  // Docs
  grunt.registerTask('docs', [
    'clean:docs',
    'jsdoc'
  ]);

  // All tests
  grunt.registerTask('all', [
    'build',
    'test',
    'coverage',
    'docs'
  ]);

  // Production
  grunt.registerTask('prod', [
    'build',
    'htmlmin',
    'uglify',
    'cssmin'
  ]);

  // Pre-Commit Hook
  grunt.registerTask('pre-commit', [
    'test'
  ]);

  // Default
  grunt.registerTask('default', [
    'all'
  ]);

};
