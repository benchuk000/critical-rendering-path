'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({ 
    pagespeed: { 
      options: { 
        nokey: true, 
        locale: 'en_GB', 
        threshold: 40 
      }, 
      local: { 
        options: { 
          strategy: 'desktop' 
        } 
      }, 
      mobile: { 
        options: { 
          strategy: 'mobile' 
        } 
      } 
    } 
  });

  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() { 
    var done = this.async(); 
    var port = 8080;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });   
  });

  grunt.registerTask('default', ['psi-ngrok']);

};