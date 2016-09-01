module.exports = function(selectors, parsed_html, callback) {
    //  Input: array of selectors for all elements on vacancy pages (cleaned), arg2: array with parsed html.
    //  Output: array with objects as elements linking selectors with text, for every single page.
    
    console.log("Obtaining text from all selectors...");
    
    var $,
    current_selector = "",
    selector_texts = [],
    pushObject = {},
    current_text = "";
    
    for (var i=0;i<parsed_html.length;i++) {
        $ = parsed_html[i];
        pushObject = {};
        
        for (var j=0; j<selectors.length;j++) {
            
            current_selector = selectors[j];
            
            current_text = $(current_selector).text();
        
            
            if (current_text.replace(/\s/g, '').length) {
                
                pushObject[current_selector] = current_text;
            }
            
        }
        
        selector_texts.push(pushObject);
        
    }
    
    console.log("Obtained text from all selectors.");
    
    callback(null, selector_texts);
    
    
}