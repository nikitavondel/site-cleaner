var async = require('async'),
    request_and_parse = require('./lib/request_and_parse'),
    create_selectors = require('./lib/create_selectors'),
    obtain_and_compare_text = require('./lib/obtain_and_compare_text'),
    generalize_selectors = require('./lib/generalize_selectors'),
    http = require('http'),
    jsonBody = require("body/json"),
    beautify_text = require('./lib/beautify_text'),
    fs = require('fs');
    
    
var server = http.createServer(function(request, response) {
    
    if (request.url == "/test") {
        
        fs.readFile('web/index.html', function (err,data) {
            if (err != null) {
                console.log(err);
            }
            response.writeHead(200);
            response.end(data);
        });
        
    } else {
    
        try {
            
        jsonBody(request, response, function (err, body) {
            if (err) {
                console.log(err);
                response.statusCode = 500;
                response.statusMessage = err;
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
                generalize_selectors,
                beautify_text
                ],

                function(err, results) {
                    //  Call when everything is done.
                    
                    if (err != null) {
                        console.log(err);
                        response.statusCode = 500;
                        response.statusMessage = err;
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
            response.statusMessage = err;
            response.end();
        }
    }
});
server.listen(8080);