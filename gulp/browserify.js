var gulp        = require( 'gulp' );
var browserify  = require( 'browserify' );
var reactify    = require( 'reactify' );
var fs          = require( 'fs' );
var babelify    = require( 'babelify' );

module.exports = function browserifyTask(){

    return browserify({ debug: true })
      .transform( babelify )
      .transform( reactify )
      .require( './js/app.js', { entry: true })
      .bundle()
      .on( 'error' , function (err) { 
          console.log( 'Error: ' + err.message); 
      })
      .pipe( fs.createWriteStream( './dist/main.js' ) );

};
