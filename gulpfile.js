var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	htmlv = require('gulp-html-validator'),
	csslint = require('gulp-csslint');

gulp.task('css', () => {
	return gulp.src('css/style.css')
		.pipe(csslint())
		.pipe(csslint.formatter())
		.pipe(cleanCSS({compatibility: 'ie8'}, (details) => {
			console.log(details.name + ': ' + formatFileSize(details.stats.minifiedSize));
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
	gulp.src('index.html')
		.pipe(htmlv({format: 'html'}))
		.pipe(gulp.dest('./out'));
});

gulp.task('default', ['html', 'css']);

function formatFileSize(bytes, decimalPoint) {
   	if (bytes == 0) return '0 Bytes';
   	var k = 1000,
       	dm = decimalPoint || 2,
       	sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       	i = Math.floor(Math.log(bytes) / Math.log(k));

   	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}