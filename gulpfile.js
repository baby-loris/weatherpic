var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var nodemon = require('gulp-nodemon');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var del = require('del');

var scripts = {
    client: ['client/**/*.js'],
    server: ['server/**/*.js', 'api/**/*.js', 'api-stub/**/*.js']
};

gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('build', ['clean'], function () {
    return gulp.src(scripts.client)
        .pipe(sourcemaps.init())
        .pipe(cached())
        .pipe(uglify())
        .pipe(remember())
        .pipe(concat('_index.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});

gulp.task('test', ['lint-client', 'lint-server']);

gulp.task('lint-client', function (cb) {
    return gulp.src(scripts.client)
        .pipe(cached('linting'))
        .pipe(jshint('./client/.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jscs());
});

gulp.task('lint-server', function (cb) {
    return gulp.src(scripts.server)
        .pipe(cached('linting'))
        .pipe(jshint('./server/.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jscs());
});

gulp.task('dev', function () {
    nodemon({
        script: 'server/boot.js',
        ext: 'html js',
        ignore: ['./.git/**', './build/**', './node_modules/**']
    })
    .on('change', ['build'])
    .on('restart', function () {
        console.log('restarted!')
    })
});
