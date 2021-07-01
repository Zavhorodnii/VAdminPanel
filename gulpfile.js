var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// обновление браузера при правке файла
gulp.task
(
	'serve', 
	function(done)
	{
		browserSync.init
		(
			{
				server: "",
				injectChanges: true,
				//proxy: "93.170.217.69:81/verstka/lcms"
			}
		);
		
		gulp.watch("styles/*.scss", gulp.series('sass'));
		gulp.watch('*.html').on
		(
			'change',
			() => 
			{
				browserSync.reload();
				done();
			}
		
		);
		
		gulp.watch('*.php').on
		(
			'change',
			() => 
			{
				browserSync.reload();
				done();
			}
		
		);
		
		done();
	}
);

// при правке стилей компиляция
gulp.task
(
	'sass',
	function(done)
	{
		gulp.src('styles/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('css'))
			.pipe(browserSync.stream());
			
		done();
	}
);

gulp.task('default',gulp.series('sass', 'serve'));