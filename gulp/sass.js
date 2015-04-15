var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );

module.exports = function sassTask(){
    return gulp.src( 'scss/*.scss' )
            .pipe( sass() )
            .pipe( gulp.dest( 'css' ) );
};
