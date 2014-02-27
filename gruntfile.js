'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**', 'app/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            },
            mochaci: {
                files: ['server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
                tasks: ['mochaci'],
                options: {
                    spawn: true
                },
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js', '!test/coverage/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'server.js'
                },
                src: ['test/mocha/**/*.js']
            },
            ci: {
                options: {
                    reporter: 'spec',
                    require: 'server.js'
                },
                src: ['test/mocha/**/*.js']
            },
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-notify');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // On watch events, if the changed file is a test file then configure mochaTest to only
    // run the tests from that file. Otherwise run all the tests
    var mochaDefaultSrc = grunt.config.get('mochaTest.ci.src');
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('mochaTest.ci.src', mochaDefaultSrc);
        if (filepath.match('test/')) {
            grunt.config('mochaTest.ci.src', filepath);
        }
    });

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test tasks.
    grunt.registerTask('test', ['env:test', 'mochaTest:test', 'karma:unit']);
    grunt.registerTask('mochaci', ['env:test', 'mochaTest:ci']);
};
