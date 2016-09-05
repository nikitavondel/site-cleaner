var async = require('async'),
    request_and_parse = require('./lib/request_and_parse'),
    create_selectors = require('./lib/create_selectors'),
    obtain_and_compare_text = require('./lib/obtain_and_compare_text'),
    generalize_selectors = require('./lib/generalize_selectors'),
    http = require('http'),
    jsonBody = require("body/json");
    
// http://tk83:8080/?urls={"urls": ["TEST", "TEST2", "TEST3"]}
    
var server = http.createServer(function(request, response) {
    try {
        
    jsonBody(request, response, function (err, body) {
        if (err) {
            response.statusCode = 500;
            response.end();
        } else {
 
            var url_list = body.urls;
            
            async.waterfall([

            function(callback) {
                request_and_parse(url_list, function(err, parsed_html) {
                    callback(err, parsed_html);
                });
            },
            create_selectors,
            obtain_and_compare_text,
            generalize_selectors
            ],

            function(err, results) {
                //  Call when everything is done.
                
                if (err != null) {
                    console.log(err);
                    response.statusCode = 500;
                    response.end();
                } else {
                    response.statusCode = 200;
                    response.end(JSON.stringify({suggestions: results}));
                }
                    
            });
        }
    })
    
    
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
});
server.listen(8080);