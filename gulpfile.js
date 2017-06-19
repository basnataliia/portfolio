'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require("gulp-concat");
var jshint = require('gulp-jshint');
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var sitemap = require('gulp-sitemap');
var reload = browserSync.reload;


 // styles task
gulp.task('styles', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat("style.css"))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('styles/'))
    .pipe(reload({ stream: true }));
});



//JS Hint Task
gulp.task("js", function() {
    return gulp.src("src/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(reload({ stream: true }));
});


//Browser Sync
gulp.task("bstask", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});


// Watch Task
gulp.task("watch", function() {
    gulp.watch("styles/*.scss", ["styles"]);
    gulp.watch("src/*.js", ["js"]);
    gulp.watch("*.html", reload);
});

// Sitemap
gulp.task('sitemap', function () {
    gulp.src('*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://localhost:3000',
            fileName: 'sitemap.xml',
            changefreq: 'weekly',
            priority: 1.0
        }))
        .pipe(gulp.dest('build'));
});


gulp.task("default", ["bstask", "styles", "js", "watch", "sitemap"]);
