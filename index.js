const express = require("express");
const { createLogger, format, transports } = require('winston');

const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    //console.log(res);
    res.render("test", {}); 
});

app.get("/log", function(req, res){
    console.log(res);

    const httpTransportOptions = {
        host: 'http-intake.logs.datadoghq.com',
        path: '/api/v2/logs?dd-api-key=[DATADOG_APIKEY]&ddsource=nodejs&service=app_name_test',
        ssl: true
    };
      
    const logger = createLogger({
        level: 'info',
        exitOnError: false,
        format: format.json(),
        transports: [
          new transports.Http(httpTransportOptions),
        ],
    });
      
    module.exports = logger;
      
    // Example logs
    logger.log('info', 'Hello simple log!');
    logger.info('Hello log with metas',{color: 'blue' });
    logger.error("error", "test");
    
    
    res.render("test", {}); 
});

app.listen(3000, function(){
    console.log("server running");
});