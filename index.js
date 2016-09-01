var async = require('async'),
    request_and_parse = require('./lib/request_and_parse'),
    create_selectors = require('./lib/create_selectors'),
    obtain_text = require('./lib/obtain_text'),
    compare_text = require('./lib/compare_text'),
    generalize_selectors = require('./lib/generalize_selectors');


var url_list = [
    "https://tgp.ppsworks.co.uk/application/index1.php?online_ref=2468BghF&title=Communications%20Manager&category=&&rnd=h0c82o7rEI4l09W6u69F8w5Sf47067Lk",
    "https://tgp.ppsworks.co.uk/application/index1.php?online_ref=WsNJs85U&title=Apprentice%20(Business%20Administration)&category=&&rnd=2OGR80NrjO7mXnJXJ6YPe08FQsFg525c",
    "https://tgp.ppsworks.co.uk/application/index1.php?online_ref=0h3jgw4N&title=Tenancy%20Enforcement%20Caseworker&category=&&rnd=2RCHlL98i6u2W5I418ALjQm9Ybm6Yaqv"
];

async.waterfall([

    function(callback) {
        request_and_parse(url_list, function(err, parsed_html) {
            callback(err, parsed_html);
        });
    },
    create_selectors,
    obtain_text,
    compare_text,
    generalize_selectors
],

function(err, results) {
    //  Call when everything is done.
    
    if (err != null) {
        console.log(err);
    } else {
        
    }
        
});