const gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	htmlv = require('gulp-html-validator'),
	csslint = require('gulp-stylelint'),
	eslint = require('gulp-eslint'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	image = require('gulp-image'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	bump = require('gulp-bump'),
	git = require('gulp-git'),
	jasmine = require('gulp-jasmine');


// Compile SASS files
gulp.task('build-css', () => {
	return gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'));
});



/********************
 * Validation
 ************************/
gulp.task('html-lint', () => {
	gulp.src('index.html')
		.pipe(htmlv({format: 'html'}))
		.pipe(gulp.dest('./out'));
});

gulp.task('css-lint', () => {
	return gulp.src('css/app.css')
		.pipe(csslint({
			failAfterError: true,
			reportOutputDir: 'out',
			reporters: [
				{
					formatter: 'json',
					save: 'css-report.json'
				}
			]
		}));
});

gulp.task('js-lint', () => {
	return gulp.src(['js/app.js'])
		.pipe(eslint({
			'rules': {
				'quotes': [1, 'single'],
				'semi': [1, 'always']
			}
		}))
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});



/***************
 * Optimization
 ***********************/

 gulp.task('scripts', () => {
 	return gulp.src([
 			'js/validator.js',
 			'js/calculator.js',
 			'js/login.js',
 			'js/cart.js',
 			'js/portfolio.js'
 		])
 		.pipe(concat('app.js'))
 		.pipe(gulp.dest('js'));
 });

gulp.task('styles', () => {
 	return gulp.src([
 			'css/style.css',
 			'css/portfolio.css',
 			'css/calculator.css',
 			'css/card.css'
 		])
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
 		.pipe(concat('app.css'))
 		.pipe(gulp.dest('css'));
});

gulp.task('minify-css', ['styles'], () => {
 	return gulp.src('css/app.css')
 		.pipe(cleanCSS({compatibility: 'ie8'}, (details) => {
 			console.log(details.name + ': ' + formatFileSize(details.stats.minifiedSize));
 		}))
 		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('minify-js', ['scripts'], (cb) => {
 	pump([
 			gulp.src('js/app.js'),
 			uglify(),
 			gulp.dest('dist/js')
 		],
 		cb
 	);
});

gulp.task('image', () => {
	gulp.src('images/*')
		.pipe(image())
		.pipe(gulp.dest('img'));
});

// Watch for changes
gulp.task('watch', () => {
	gulp.watch('scss/**/*.scss', ['build-css']);
	gulp.watch('js/app.js', ['js-lint']);
	gulp.watch('css/app.css', ['css-lint']);
});

gulp.task('version', () => {
  gulp.src(['./package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('deploy', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

// Main tasks to run in the terminal
gulp.task('serve', ['minify-css'], () => {

	browserSync.init({
		server: './'
	});

	gulp.watch('scss/**/*.scss', ['build-css']);
	gulp.watch('css/*.css', ['minify-css']);
	gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('default', ['dev']);

gulp.task('dev', ['html-lint', 'scripts', 'styles', 'watch']);

// gulp.task('test', () =>
//     gulp.src('spec/jasmine_examples/PlayerSpec.js')
//         .pipe(jasmine())
// );

gulp.task('prod', ['minify-css', 'minify-js', 'image']);

gulp.task('deploy', ['version', 'deploy']);


/*
 * Convert file size to human readable form
 */
function formatFileSize(bytes, decimalPoint) {

		if (bytes == 0) return '0 Bytes';

   	var k = 1000,
       	dm = decimalPoint || 2,
       	sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       	i = Math.floor(Math.log(bytes) / Math.log(k));

   	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
