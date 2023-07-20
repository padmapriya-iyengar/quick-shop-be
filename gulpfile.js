const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const babel = require('babel-register')
const configuration = require('./config/config')

/**
 * auto start the express server for every code change, applicable for development only
 */
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

/**
 * watch for any change in js files and run the above serve task to restart express server
 */
gulp.watch('src/*.js',gulp.series(['serve']))