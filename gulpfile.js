/* ====================================
 * Define paths
 * ==================================== */
var source = 'source';
var build = 'build';

/* ====================================
 * Load required plug-ins
 * ==================================== */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');

var plumberConfig = {errorHandler: $.notify.onError("Error: <%= error.message %>")};

/* ====================================
 * Web server
 * ==================================== */
gulp.task('serve', ['watch'], function(){
  browserSync({
    server: {
      baseDir: build
    },
    notify: false,
    ghostMode: false
  });
});

/* ====================================
 * Styles
 * ==================================== */
gulp.task('styles', function () {
  return gulp.src(source + '/scss/**/style.scss')
    .pipe($.plumber(plumberConfig))
    .pipe($.rubySass())
    .pipe($.autoprefixer((["last 1 version", "> 1%", "ie 8", "ie 7"], { cascade: true })))
    .pipe(gulp.dest(build + '/css/'));
});


/* ====================================
 * Scripts
 * ==================================== */
 gulp.task('jshint', function() {
  return gulp.src(source + '/js/script.js')
    .pipe($.plumber(plumberConfig))
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('scripts', function () {
  return gulp.src([source + '/js/plugins.js', source + '/js/**/*'])
    .pipe($.plumber(plumberConfig))
    .pipe(gulp.dest(build + '/js'));
});

/* ====================================
 * Images
 * ==================================== */
gulp.task('images', function() {
  return gulp.src(source + '/img/**/*')
    .pipe($.plumber(plumberConfig))
    .pipe(gulp.dest(build + '/img'));
});

/* ====================================
 * HTML
 * ==================================== */
gulp.task('html-default', function() {
  var vendorjs = gulp.src(bowerFiles())
    .pipe($.plumber(plumberConfig))
    .pipe($.filter('**/*.js'))
    .pipe(gulp.dest(build + '/js'));

  var vendorcss = gulp.src(bowerFiles())
    .pipe($.plumber(plumberConfig))
    .pipe($.filter('**/*.css'))
    .pipe(gulp.dest(build + '/css'));

  var scripts = gulp.src([source + '/js/plugins.js', source + '/js/**/*'])
    .pipe($.plumber(plumberConfig))
    .pipe(gulp.dest(build + '/js'));

  var scriptsHead = gulp.src([source + '/js/vendor/modernizr.js'])
    .pipe($.plumber(plumberConfig))
    .pipe(gulp.dest(build + '/js'));

  var styles = gulp.src(source + '/scss/**/style.scss')
    .pipe($.plumber(plumberConfig))
    .pipe($.rubySass())
    .pipe($.autoprefixer((["last 1 version", "> 1%", "ie 8", "ie 7"], { cascade: true })))
    .pipe(gulp.dest(build + '/css/'));

  return gulp.src([
      source + '/htdocs/**/*.html',
      '!' + source + '/htdocs/_templates{,/**}'
    ])
    .pipe($.plumber(plumberConfig))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: 'source/'
    }))
    .pipe($.inject(scriptsHead,
      { ignorePath: [build, source],
        addRootSlash: true,
        starttag: '<!-- inject:head:{{ext}} -->'
      }
    ))
    .pipe($.inject(es.merge(
        vendorcss,
        vendorjs
      ),
      {
        name: 'bower',
        ignorePath: [build, source],
        addRootSlash: true
      }
      ))
    .pipe($.inject(es.merge(
      styles,
      scripts
    ),
      {
        ignorePath: [build, source],
        addRootSlash: true
      }
    ))
    .pipe(gulp.dest(build));
});

gulp.task('html-build', function() {
  var vendorjs = gulp.src(bowerFiles())
    .pipe($.plumber(plumberConfig))
    .pipe($.filter('**/*.js'))
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(build + '/js'));

  var vendorcss = gulp.src(bowerFiles())
    .pipe($.plumber(plumberConfig))
    .pipe($.filter('**/*.css'))
    .pipe($.concat('vendor.css'))
    .pipe($.minifyCss())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(build + '/css'));

  var scripts = gulp.src([source + '/js/plugins.js', source + '/js/**/*'])
    .pipe($.plumber(plumberConfig))
    .pipe($.concat('script.js'))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(build + '/js'));

  var scriptsHead = gulp.src([source + '/js/vendor/modernizr.js'])
    .pipe($.plumber(plumberConfig))
    .pipe(gulp.dest(build + '/js'));

  var styles = gulp.src(source + '/scss/**/*.scss')
    .pipe($.plumber(plumberConfig))
    .pipe($.rubySass())
    .pipe($.concat('style.css'))
    .pipe($.autoprefixer((["last 1 version", "> 1%", "ie 8", "ie 7"], { cascade: true })))
    .pipe($.minifyCss())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(build + '/css/'));

  return gulp.src([
      source + '/htdocs/**/*.html',
      '!' + source + '/htdocs/_templates{,/**}'
    ])
    .pipe($.plumber(plumberConfig))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: 'source/'
    }))
    .pipe($.inject(scriptsHead,
      { ignorePath: [build, source],
        addRootSlash: true,
        starttag: '<!-- inject:head:{{ext}} -->'
      }
    ))
    .pipe($.inject(es.merge(
        vendorcss,
        vendorjs
      ),
      {
        name: 'bower',
        ignorePath: [build, source],
        addRootSlash: true
      }
      ))
    .pipe($.inject(es.merge(
      styles,
      scripts
    ),
      {
        ignorePath: [build, source],
        addRootSlash: true
      }
    ))
    .pipe(gulp.dest(build));
});

/* ====================================
 * Clean up
 * ==================================== */
gulp.task('clean', del.bind(null, [build + '/*'], {dot: true}));

/* ====================================
 * Copy files
 * ==================================== */
gulp.task('copyfiles', function() {
    return gulp.src(source + '/**/*.{ttf,woff,eof,svg,ico}')
      .pipe($.plumber(plumberConfig))
      .pipe(gulp.dest(build));
});

/* ====================================
 * Gulp tasks
 * ==================================== */

// For local development
gulp.task('default', ['clean'], function(){
  runSequence(
    ['html-default', 'images', 'copyfiles'],
    ['serve']
  );
});

// For staging/production deployment
gulp.task('build', ['clean'], function(){
  runSequence(
    ['html-build', 'images', 'copyfiles']
  );
});

/* ====================================
 * Watch
 * ==================================== */
gulp.task('watch', function() {
  gulp.watch(source + '/scss/**/*.scss', ['styles', reload]);

  gulp.watch(source + '/js/**/*.js', ['jshint', 'scripts', reload]);

  gulp.watch(source + '/img/**/*', ['images', reload]);

  gulp.watch(source + '/htdocs/**/*', ['html-default', reload]);
});
