/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    qunit: {
      files: ['test/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'source/intro.js', 'source/core.js', 'source/helpers.js', 'source/core-methods.js', 'source/attributes.js', 'source/manipulation.js', 'source/outro.js'],
        dest: 'builds/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'builds/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    lint: {
      afterconcat: ['builds/hippo.js']
    },
    uglify: {},
    jshint: {
      options: {
        "evil": true,
        "regexdash":true,
        "browser":true,
        "wsh":true,
        "curly":true,
        "eqnull":true,
        "expr":true,
        "noarg":true,
        "quotemoark":"single",
        "smarttabs":true,
        "trailing":true,
        "undef":true,
        "es5" : true,
        "unused": true,
        "sub": true
      },
      globals: {
        'hippo': true
      }
    },
    yuidoc: {
      compile: {
        'name': 'hippojs',
        'description': 'hippo.js is a wishful jQuery inspired DOM Library for use in modern browsers',
        'version': '0.1',
        'url': 'http://hippojs.com',
        'logo':'',
        options: {
          paths: 'source',
          outdir: 'docs'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'qunit concat lint:afterconcat min yuidoc');

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

};