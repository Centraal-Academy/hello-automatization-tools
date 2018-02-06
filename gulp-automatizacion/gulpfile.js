const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const babel = require('gulp-babel')
const pug = require('gulp-pug')
const uglify = require('gulp-uglify')
const template = require('gulp-template')
const sourcemaps = require('gulp-sourcemaps')

const production = process.argv.length > 2

const babelConfig = {
  presets: ['env']
}

const sourceMapUglifyConfig = {
  sourceMap: {
    url: 'app.js.map'
  }
}

const browserSyncConfigStream = {
  stream: true
}

const browserSyncConfig = {
  server: {
    baseDir: 'build'
  }
}

const templateConfig = {
  title: 'Template title'
}

gulp.task('babelify', function () {
  let stream = gulp.src('app/js/app.js')
    .pipe(babel(babelConfig))

  if (production) {
    stream = stream
      .pipe(sourcemaps.init())
      .pipe(uglify(sourceMapUglifyConfig))
      .pipe(sourcemaps.write('./'))
  }

  return stream.pipe(gulp.dest('build/js/'))
  .pipe(browserSync.reload(browserSyncConfigStream))
})

gulp.task('pug', function () {
  return gulp.src('app/index.pug')
    .pipe(template(templateConfig))
    .pipe(pug())
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload(browserSyncConfigStream))
})

gulp.task('browserSync', function () {
  browserSync.init(browserSyncConfig)
})

gulp.task('default', ['browserSync', 'babelify', 'pug'], function () {
  gulp.watch('app/js/app.js', ['babelify'])
  gulp.watch('app/index.pug', ['pug'])
})

gulp.task('production', ['babelify', 'pug'])
