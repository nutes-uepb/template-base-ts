'use strict'

// DEPENDENCIES
const gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    ts = require('gulp-typescript'),
    nodemon = require('gulp-nodemon')

// TSLIST
gulp.task('lint', () => {
    const config = {formatter: 'verbose'}
    return gulp.src(['src/**/*.ts'])
        .pipe(tslint(config))
        .pipe(tslint.report({
            reportLimit: 5
        }))
})

// BUILD
gulp.task('build:ts', ['copy-files'], () => {
    const tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')})
    return tsProject.src()
        .pipe(tsProject())
        .on('error', (err) => {
            console.log('build error:', err.message)
            process.exit(1)
        })
        .js.pipe(gulp.dest('dist/'))
})

// COPY FILES
gulp.task('copy-files', ['copy-yaml'], () => {
    const COPY_FILES = ['package.json']
    return gulp.src(COPY_FILES)
        .pipe(gulp.dest('dist'))
})

gulp.task('copy-yaml', () => {
    const COPY_YAML = ['src/ui/swagger/*.yaml']
    return gulp.src(COPY_YAML)
        .pipe(gulp.dest('dist/src/ui/swagger'))
})

// WATCH
gulp.task('watch', () => {
    gulp.watch(['./**/*.ts', './src/utils/swagger/*.yaml', '.env'], ['build'])
})

// BUILD DEFAULT
gulp.task('build', ['lint', 'build:ts'])

// BUILD DEV
gulp.task('dev', ['build', 'watch'], () => {
    return nodemon({
        script: 'dist/server.js',
        watch: 'dist/server.js',
        ignore: ['node_modules/']
    }).on('restart', () => {
        console.log('restarted!')
    })
})
