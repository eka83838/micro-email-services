const env = require("dotenv").config();
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const tslint = require('gulp-tslint');
const files = require('./tsconfig').files;

gulp.task('tslint', () =>
    gulp.src(files).pipe(tslint({
        formatter: 'verbose'
    })).pipe(tslint.report())
);

gulp.task('scripts', () => {
  const tsResult = tsProject.src().pipe(tsProject());
  gulp.src('./data/*.json').pipe(gulp.dest('build/data'));
  if (process.env.APP === "development") {
    gulp.src('./seeders/test.json').pipe(gulp.dest('build/seeders'));
  }
  return tsResult.js.pipe(gulp.dest('build'));  
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('**.ts', ['scripts']);
});

gulp.task('default', ['watch']);