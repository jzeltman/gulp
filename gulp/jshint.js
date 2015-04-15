var gulp   = require( 'gulp' );
var jshint = require( 'gulp-jshint' );

module.exports = function jshintTask(){
    return gulp.src( 'js/*.js' )
            .pipe( jshint() )
            .pipe( jshint.reporter( 'default' ) );
};
