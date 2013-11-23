'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var vagjConfig = {
        appDir: 'js'
    };

    grunt.initConfig({
        watch: {
          coffee: {
            files: ['js/{,*/}*.coffee'],
            tasks: ['coffee:dist']
          },
          compass: {
            files: ['css/{,*/}*.{scss,sass}'],
            tasks: ['compass:server']
          },
          livereload: {
            options: {
              livereload: LIVERELOAD_PORT
            },
            files: [
              '{,*/}*.html',
              '{.tmp,css/{,*/}*.css',
              '{.tmp,js}{,*/}*.js',
              //'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
          }
        },
        coffee: {
            dist: {
              files: [{
                expand: true,
                cwd: 'js',
                src: '{,*/}*.coffee',
                dest: '.tmp/js/',
                ext: '.js'
              }]
            },
            test: {
              files: [{
                expand: true,
                cwd: 'test/spec',
                src: '{,*/}*.coffee',
                dest: '.tmp/spec',
                ext: '.js'
              }]
            }
        },
        copy: {
            styles: {
              expand: true,
              cwd: 'css',
              dest: '.tmp/css/',
              src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
              'coffee:dist',
              'compass:server'
            ]
        },
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
              files: [{
                expand: true,
                cwd: '.tmp/css/',
                src: '{,*/}*.css',
                dest: '.tmp/css/'
              }]
            }
        },
        connect: {
          options: {
            port: 9000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: '0.0.0.0'
          },
          livereload: {
            options: {
              middleware: function (connect) {
                return [
                  lrSnippet,
                  mountFolder(connect, '.tmp'),
                  mountFolder(connect, '.')
                ];
              }
            }
          },
          test: {
            options: {
              middleware: function (connect) {
                return [
                  mountFolder(connect, '.tmp'),
                  mountFolder(connect, 'test')
                ];
              }
            }
          },
          dist: {
            options: {
              middleware: function (connect) {
                return [
                  mountFolder(connect, vagjConfig.appDir)
                ];
              }
            }
          }
        },
        open: {
          server: {
            url: 'http://localhost:<%= connect.options.port %>'
          }
        },
        clean: {
          server: '.tmp'
        },
        jshint: {
          options: {
            jshintrc: '.jshintrc'
          },
          all: [
            'Gruntfile.js',
            'js/{,*/}*.js'
          ]
        },
        compass: {
            options: {
              sassDir: 'css',
              cssDir: '.tmp/css',
              generatedImagesDir: '.tmp/images/generated',
              imagesDir: 'images',
              javascriptsDir: 'scripts',
              fontsDir: 'css/fonts',
              importPath: 'css',
              httpImagesPath: 'images',
              httpGeneratedImagesPath: 'images/generated',
              httpFontsPath: 'font',
              relativeAssets: false
            },
            dist: {},
            server: {
              options: {
                debugInfo: true
              }
            }
        }
    });

    grunt.registerTask('server', function(target) {
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });
};
