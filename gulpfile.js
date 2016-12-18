var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')


var bases = {
    app: 'app/',
    dist: 'dist/',
};

var paths = {
    scripts: ['*.js'],
    libs: ['scripts/libs/**/*.js'],
    styles: ['styles/styles.scss'],
    html: ['index.html'],
    modulehtml: ['**/**/views/*.html'],
    images: ['images/**/*.png']
    //extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};


gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(clean());
});

gulp.task('browserify', function () {
    // Grabs the app.js file
    return browserify(bases.app + 'app.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(bases.dest('app.js'));
});

gulp.task('scripts', function () {
    var b = browserify({
        entries: bases.app + 'app.js', // Only need initial file, browserify finds the deps
        debug: true        // Enable sourcemaps
    });

    b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())

        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(bases.dist));

        

    gulp.src(paths.libs, { cwd: bases.app })
        .pipe(gulp.dest(bases.dist + 'scripts/libs/'));


});

gulp.task('styles', function () {
    gulp.src(paths.styles, { cwd: bases.app })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(bases.dist + 'styles/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('copy', function () {

    gulp.src(paths.html, { cwd: bases.app })
        .pipe(gulp.dest(bases.dist));

    gulp.src(paths.modulehtml, { cwd: bases.app })
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(bases.dist + 'views/'));

});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
})

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('default', ['styles', 'scripts', 'copy', 'browserSync'], function () {
    gulp.watch(['app/**/*.scss'], ['styles'])
    gulp.watch(['app/**/*.js'], ['scripts'])
    gulp.watch(['app/**/*.html', '*.html'], ['copy', 'bs-reload']);
});