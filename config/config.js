/**
 * configuration object
 */
const configuration = {
    express_port: 3030,
    header_options:{
        origins: 'http://localhost:4204',
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        headers: 'X-Requested-With,content-type',
        credentials: true,
    },
    log_config:{
        folder_path: './/logs//',
        file_path: 'quickshop-log-%DATE%.log'
    },
    db:{
        schema:'quickshop_db',
        username:'appuser',
        password:'appuser@123',
        host:'localhost',
        dialect:'mysql',
        timezome:'+04:00',
        logging: false
    },
    app_path: '/dist/app',
    root_app_file: '/index.html' 
}

module.exports = configuration