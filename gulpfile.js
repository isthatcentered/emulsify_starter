/* globals require */

(function () {
  'use strict';

  // General
  var gulp = require('gulp-help')(require('gulp'));
  var localConfig = {};

  try {
    localConfig = require('./local.gulp-config');
  }
  catch (e) {
    localConfig = {
	    paths: {
		    js: ``,
		    img: ``,
	    },
	    browserSync: {
		    // enabled: true,
		    // baseDir: './',
		    // startPath: 'pattern-lab/public/',
		    // Uncomment below if using a specific local url
		    // domain: 'emulsify.dev',
		    notify: true,
		    openBrowserAtStart: true,
		    // reloadOnRestart: true,
		    // ui: false,
	    },
	    patternLab: {
		    // enabled: true,
		    // configFile: `${themeDir}pattern-lab/config/config.yml`,
		    // watchedExtensions: (['twig', 'json', 'yaml', 'yml', 'md', 'jpg', 'jpeg', 'png']),
		    twigAutoescape: "",
		    twigDebug: true,
		    scssToYAML: [],
	    },
    }
  }
  require('emulsify-gulp')(gulp, localConfig);

})();
