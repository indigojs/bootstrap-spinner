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
        src: 'src/spinner.js',
        dest: 'dist/bootstrap-spinner.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      dist: {
        src: 'dist/bootstrap-spinner.js',
        dest: 'dist/bootstrap-spinner.min.js'
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['clean', 'copy', 'uglify']);
};
