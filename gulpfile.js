var gulp = require('gulp');
var minifyHTML = require('gulp-htmlmin');
var changedInPlace = require('gulp-changed-in-place');
var jsonminify = require('gulp-jsonminify');
var replace = require('gulp-replace');

const DEST = './_site';
const HTML_PATH = './_site/**/*.html';
const JSON_PATH = './_site/*.json';

gulp.task('minifyHTML', function() {
  return gulp.src(HTML_PATH)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(gulp.dest(DEST));
});

gulp.task('minifyJSON', function() {
  return gulp.src(JSON_PATH)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(jsonminify())
    .pipe(gulp.dest(DEST));
});

gulp.task('mermaidStyle', function() {
  return gulp.src(HTML_PATH)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(
      replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
              '<div class="mermaid">$1</div>'))
    .pipe(gulp.dest(DEST))
});
