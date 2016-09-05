module.exports = function (selectors, html, callback) {
    
    var selector_text_obj = get_text([html[0], html[1]], selectors);
    
    var suspicious_selectors = compare_text(selector_text_obj);
    
    for (var i=2; i<html.length; i++) {
        
        selector_text_obj = get_text([html[0], html[i]], suspicious_selectors);
        suspicious_selectors = compare_text(selector_text_obj);
        
    }
    
    callback(null, suspicious_selectors);
    
    function get_text(parsed_html, selectors) {
        
        var $ = {};
        var pushObject = {};
        var current_selector = {};
        var current_text = "";
        var selector_texts = [];
        
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
        
        return selector_texts;
    }
    
    function compare_text(selector_texts) {
        
        var current_page = "",
            current_compare_page = "",
            selector = "",
            suspects = {},
            compare_selector = "",
            found = false;
        
        for (var i=0; i<selector_texts.length; i++) {
            
            current_page = selector_texts[i];
            
            found = false;
            
            for (selector in current_page) {
                if (current_page.hasOwnProperty(selector)) {
                    
                    for (var j=0; j<selector_texts.length; j++)  {
                        
                        if (i == j) {
                            continue;
                        }
                        
                        current_compare_page = selector_texts[j];
                        
                        for (compare_selector in current_compare_page) {
                            
                            if (current_compare_page.hasOwnProperty(compare_selector)) {
                                
                                if (selector == compare_selector) {
                                
                                    if (current_page[selector] == current_compare_page[compare_selector]) {
                                        
                                        if (typeof suspects[selector] === "undefined") {
                                            
                                            suspects[selector] = 1;
                                            
                                        } else {
                                            
                                            suspects[selector]++;
                                            
                                        }
                                        
                                        found = true;
                                        
                                        break;
                                        
                                    }
                                
                                }
                                
                            }
                        }
                        
                        if (found) {
                            break;
                        }
                        
                    }
                    
                }
            }
            
        }
        
        var remove_selectors = [];
        
        for (var suspected_selector in suspects) {
            if (suspects.hasOwnProperty(suspected_selector)) {
                
                if (suspects[suspected_selector] == selector_texts.length) {
                    
                    remove_selectors.push(suspected_selector);
                    
                }
                
            }
        }
        
        return remove_selectors;
    }
    
    
    
    
    
}