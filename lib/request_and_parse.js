var request = require('request'),
    cheerio = require('cheerio'),
    async = require('async');

module.exports = function (url_list, callback) {
    //  Input: array with URLs
    //  Output: array with Cheerio parsed HTML
    
    var done = false,
        parsed_html_list = [],
        i = 0;
    
    async.doUntil(function(callback2) {
        
        request(url_list[i], function(err, response, html) {
                    
            if (err != null) {
                
                callback2(err);
                
            } else if (response.statusCode != 200) {
                
                callback2("Expected status code 200, not code " + response.statusCode);
                
            } else {
                
                parsed_html_list.push(cheerio.load(html));
                
                if (i == url_list.length - 1) {
                    
                    done = true;
                    callback2(null, parsed_html_list);
                    
                } else {
                    
                    callback2(null);
                    
                }
                
            }

        });
        
    }, function() {
        
        i++;
        return done;
        
    }, function(err, results) {
        //  When all requests are done.
        //  results = parsed_html_list
        
        if (err != null) {
            callback(err);
        } else {
            callback(null, results);
        }
        
    });

}