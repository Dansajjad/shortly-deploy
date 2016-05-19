module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      }, 
      dist: {
        files: {
          'public/dist/libs.js': [
            'public/lib/jquery.js', 
            'public/lib/underscore.js', 
            'public/lib/backbone.js', 
            'public/lib/handlebars.js'
          ], 
          'public/dist/app.js': [
            'public/client/app.js', 
            'public/client/link.js', 
            'public/client/links.js', 
            'public/client/linkView.js', 
            'public/client/linksView.js', 
            'public/client/createLinkView.js', 
            'public/client/router.js'
          ]
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'public/dist/libs.min.js': ['public/dist/libs.js'],
          'public/dist/app.min.js': ['public/dist/app.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'server.js',
        'server-config.js',
        'app/**/*.js', 
        'lib/**/*.js', 
        'public/client/**/*.js',
        'test/**/*.js'
      ]
    },

    cssmin: {
      'public/dist/style.min.css': 'public/style.css'
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master' 
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['eslint', 'test', 'concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'build', 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'nodemon' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'build', 'upload'
  ]);


};
