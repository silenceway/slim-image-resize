module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            js: {
                files: ["*.js"],
                tasks: ["jshint"]
            },
            php: {
                files: ["src/**/*.php", "test/*.php"],
                tasks: ["testphp"]
            }
        },
        jshint: {
            files: ["*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        phplint: {
            options: {
                swapPath: "/tmp"
            },
            all: ["src/**/*.php", "test/*.php"]
        },
        phpunit: {
            unit: {
                dir: "test"
            },
            options: {
                bin: "vendor/bin/phpunit --bootstrap=vendor/autoload.php --coverage-text --coverage-html ./report",
                //bootstrap: "test/bootstrap.php",
                colors: true,
                testdox: false
            }
        },
        phpcs: {
            application: {
                dir: ["src/**/*.php", "test/*.php"]
            },
            options: {
                bin: "vendor/bin/phpcs",
                standard: "PSR2"
            }
        }
    });

    require("load-grunt-tasks")(grunt);

    /*
    grunt.registerTask("build", ["concat", "uglify", "cssmin"]);
    grunt.registerTask("test", ["jshint", "jasmine"]);
    grunt.registerTask("default", ["testphp", "test", "build"]);
    */
    grunt.registerTask("testphp", ["phplint", "phpcs", "phpunit"]);
    grunt.registerTask("default", ["jshint", "testphp"]);

};