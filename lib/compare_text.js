module.exports = function(selector_texts, callback) {
    //  Input: array linking containing objects linking selectors with text, for every single page.
    //  Output: array of ALL selectors which can be removed.
    
    console.log("Comparing text...");
    
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
    
    //  Show text of all elements it wants removed. Uncomment for effect.
    for (var i=0; i<remove_selectors.length; i++) {
        
        console.log(selector_texts[0][remove_selectors[i]]);
        
    }
    
    console.log("Compared text.");
    
    callback(null, remove_selectors);
    
}