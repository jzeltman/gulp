var gulp    = require( 'gulp' );
// https://www.npmjs.com/package/gulp-compass
var compass = require( 'gulp-compass' );

module.exports = function sassTask(){
    return gulp.src( 'scss/*.scss' )
            .pipe( compass({
                config_file : '',
                css : 'css',
                scss : 'scss'
            }) )
            .pipe( gulp.dest( 'css' ) );
};
