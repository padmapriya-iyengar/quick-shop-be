const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const configuration = require('./config/config')
const logger = require('./root/logger')
const root = require('./api/common')
const sequelize = require('./root/db_connect')

const port = configuration.express_port

/**
 * log every api request
 */
morgan.token('m-type', function(req,res) {return req.method})
morgan.token('m-request', function(req,res) {return req.method=='POST'?JSON.stringify(req.body):JSON.stringify(req.query)})
morgan.token('m-url', function(req,res) {return req.protocol + '://' + req.get('host') + req.originalUrl})
morgan.token('m-status', function(req,res) {return res.statusCode})
app.use(morgan('Type\: :m-type -- Request\: :m-request -- URL\: :m-url -- Status\: :m-status -- Response Time\: :response-time ms', {stream: {write: message => logger.info(message)}}))

/**
 * handle json request body
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * handle cors
 */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',configuration.header_options.origins);
    res.setHeader('Access-Control-Allow-Methods',configuration.header_options.methods);
    res.setHeader('Access-Control-Allow-Headers',configuration.header_options.headers);
    res.setHeader('Access-Control-Allow-Credentials',configuration.header_options.credentials);
    next();
});

/**
 * root route path for api
 */
app.use('/quickshop',root)

/**
 * load the index.html from ui build when server starts
 */
app.use(express.static(process.cwd()+configuration.app_path));
app.get('/', (req,res) => {
    res.sendFile(process.cwd()+configuration.app_path+configuration.root_app_file)  
});

/**
 * database connection establishment
 */
sequelize.authenticate().then(() => {
    logger.info('DB Connection has been established successfully.')
    const server = app.listen(port,() => {
        logger.info(`Listening to port ${port}`)
    })
 }).catch((error) => {
    logger.error('Unable to connect to the database: ', error);
 });

 /**
 * end database connection when server stops
 */
process.on('exit',function(){
   logger.info('DB Connection Ended!!')
   sequelize.close();
})