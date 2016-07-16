// CONFIGURATION
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var cssbeautify = require('gulp-cssbeautify');
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require("gulp-rename");
var watch = require('gulp-watch');


// Variables fichiers sources
var jsSource = [
    './assets/js/app.js',
    './assets/js/shared/**/*.js',
    './assets/js/partials/**/*.js',
    './assets/js/*.js'
];

var jsVendors = [
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-material/angular-material.js',
    'bower_components/angular-deckgrid/angular-deckgrid.js',
    'node_modules/angular-youtube-embed/src/angular-youtube-embed.js'
];

var cssSource = [
    './assets/styles/*.scss',
    './assets/styles/0-plugins/*.scss',
    './assets/styles/1-base/*.scss',
    './assets/styles/2-modules/*.scss',
    './assets/styles/3-layouts/*.scss'
];

var templatesSource = [
    './assets/js/shared/**/*.html',
    './assets/js/partials/**/*.html',
    './assets/js/partials/*.html',
    './assets/js/projects.json'
];

// Variables fichiers sorties
var jsOut = 'scripts.js';
var jsVendorsOut = 'vendors.js';
var dest = './dist/';

// TASKS DEVELOPMENT / BUILD
gulp.task('compileJS', function () {
    return gulp.src(jsSource)
        .pipe(sourcemaps.init())
        .pipe(concat(jsOut))
        .pipe(sourcemaps.write(dest))
        .pipe(gulp.dest(dest));
});

gulp.task('compileCSS', function () {
    return gulp.src(cssSource)
        .pipe(sourcemaps.init())
        .pipe(compass({
            config_file: './config.rb',
            css: './dist',
            sass: './assets/styles'
        }))
        .pipe(csscomb())
        .pipe(cssbeautify())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write(dest))
        .pipe(gulp.dest(dest));
});

gulp.task('copyTemplates', function(){
    return gulp.src(templatesSource)
        .pipe(gulp.dest('./dist/templates/'))
});


// TASKS PRODUCTION / ONLINE
gulp.task('compileVendors', function () {
    return gulp.src(jsVendors)
        .pipe(sourcemaps.init())
        .pipe(concat(jsVendorsOut))
        .pipe(sourcemaps.write(dest))
        .pipe(gulp.dest(dest));
});

gulp.task('minifyJS', function () {
    return gulp.src('./dist/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('minifyCSS', function () {
    return gulp.src('./dist/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(dest));
});

// TASKS GENERIQUES
// Tâche "build"
gulp.task('build', ['compileJS', 'compileVendors', 'compileCSS', 'copyTemplates']);

// Tâche "prod" = Build + compileVendors + minifyCSS + minifyJS
gulp.task('prod', ['minifyCSS', 'minifyJS']);

// Watcher
gulp.task('watch', ['compileCSS', 'compileJS', 'copyTemplates'], function () {
    gulp.watch(cssSource, ['compileCSS']);
    gulp.watch(jsSource, ['compileJS']);
    gulp.watch(templatesSource, ['copyTemplates']);
});
