var gulp  = require( 'gulp' );
var watch = require( 'gulp-watch' );

module.exports = function watchTask(){
    gulp.watch( 'js/**/*.js', ['browserify'] );
    gulp.watch( 'scss/*.scss', ['sass'] );
};
