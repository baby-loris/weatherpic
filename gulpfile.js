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
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var fs = require('fs');

var assets = {
    scripts: {
        client: [
            'client/**/*.js'
        ],
        clientVendors: [
            'node_modules/ym/modules.js',
            'node_modules/mustache/mustache.js',
            'node_modules/vow/vow.min.js',
            'node_modules/inherit/lib/inherit.js',
            'node_modules/baby-loris-api/blocks/baby-loris-api-error/*.js',
            'node_modules/baby-loris-api/blocks/baby-loris-api/*.js'
        ],
        server: [
            'server/**/*.js',
            'api/**/*.js',
            'api-stub/**/*.js'
        ]
    },
    styles: ['client/**/*.styl']
};

gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('scripts', ['clean'], function () {
    return gulp.src([].concat(assets.scripts.clientVendors, assets.scripts.client))
        .pipe(sourcemaps.init())
        .pipe(cached('scripts'))
        .pipe(uglify())
        .pipe(remember())
        .pipe(concat('scripts.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});


gulp.task('styles', ['clean'], function () {
    return gulp.src(assets.styles)
        .pipe(stylus())
        .pipe(minifyCSS())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('test', ['lint-client', 'lint-server']);

gulp.task('lint-client', function (cb) {
    return gulp.src(assets.scripts.client)
        .pipe(cached('linting'))
        .pipe(jshint('./client/.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
});

gulp.task('lint-server', function (cb) {
    return gulp.src(assets.scripts.server)
        .pipe(cached('linting'))
        .pipe(jshint('./server/.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
});

gulp.task('environment', function (cb) {
    var environment = process.env.NODE_ENV || 'development';
    del('configs/current', {force: true}, function () {
        fs.symlink(environment, 'configs/current');
    });
});

gulp.task('dev', ['build'], function () {
    nodemon({
        script: 'server/app.js',
        ext: 'html js styl',
        ignore: ['./.git/**', './build/**', './node_modules/**']
    })
    .on('change', ['build']);
});
