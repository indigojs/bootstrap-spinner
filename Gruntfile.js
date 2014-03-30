module.exports = function(grunt) {
  "use strict";

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    clean: {
      dist: ['dist']
    },

    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: [
          'src/bootstrap-spinner.js',
          'src/mousehold.js'
        ],
        dest: 'dist/'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      spinner: {
        src: 'dist/bootstrap-spinner.js',
        dest: 'dist/bootstrap-spinner.min.js'
      },
      mousehold: {
        src: 'dist/mousehold.js',
        dest: 'dist/mousehold.min.js'
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['clean', 'copy', 'uglify']);
};
