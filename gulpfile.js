var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	minifyCSS = require("gulp-minify-css"),
	imagemin = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass');
var server = require('gulp-server-livereload'),
 	inject = require('gulp-inject');

gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('watchsass', function () {
    gulp.watch('./src/sass/*.scss', ['sass']);
});

gulp.task('webserver', ['sass','watchsass'], function() {
	gulp.src('./src')
		.pipe(server({
            host: '127.0.0.1' || 'localhost',
			port: '8080',
			livereload: {
                enable: true,
                filter: function (filename, cb) {
                    cb(!/\.(sa|le)ss$|node_modules/.test(filename));
                }
            },
			// directoryListing: true,
            open: true,
            defaultFile: '/index.html'
		}));
});

gulp.task('html', function() {
	gulp.src('./src/*.html')
		.pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
	gulp.src('./src/css/*.css')
		.pipe(minifyCSS())
			.pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function() {
	gulp.src(['./src/js/*.js', './src/js/**/*.js'])
		.pipe(uglify({compress: false}))
        	.pipe(gulp.dest('dist/js/'));
});

gulp.task('image', function() {
	gulp.src(['src/images/**/*.@(jpg|jpeg|ico|png|gif|svg)'])
        .pipe(imagemin())
			.pipe(gulp.dest('dist/images/'));
});

gulp.task('fonts', function() {
	gulp.src(['src/fonts/**/*.@(otf|eot|svg|ttf|woff|woff2)'])
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('clean', function() {
	return gulp.src("dist/")
       .pipe(clean());
});

gulp.task('build', ['clean'], function() {
	gulp.start('html', 'css', 'scripts', 'image', 'fonts');
});
