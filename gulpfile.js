const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const babel = require('babel-register')
const configuration = require('./config/config')

gulp.task('serve', function(){
    nodemon({
        script: 'index.js',
        ext: 'js',
        env: {
            NODE_ENV: 'dev',
            port: configuration.express_port
        },
        ignore: ['./node_modules/*']
    })
})

gulp.watch('src/*.js',gulp.series(['serve']))