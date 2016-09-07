module.exports = function (parsed_html, callback) {
    //  Input: array with Cheerio parsed HTML
    //  Output: array with cleaned css selectors
    
    function return_selectors($) {
        
        var all_elements = $('*'),
            not_top_element = true,
            css_selectors = [],
            current_selector = "",
            current_attribs = {},
            current_class = "",
            current_element = "",
            normalized_class = "",
            used_selectors = {};

        for (var i=0; i < all_elements.length; i++) {
            
            current_selector = "";
            not_top_element = true;
            body_found = false;
            current_element = all_elements[i];
            
            current_attribs = current_element.attribs;
            
            if (current_element.name == "script" || current_element.name == "meta" || current_element.name == "link"  ||
                current_element.name == "body" || current_element.name == "head" || current_element.name == "title" ||
                current_element.name == "html" || current_element.name == "style") {
                continue;
            }
            

            do {
                
                if (current_element.parent == null) {
                    
                    not_top_element = false;
                    
                    //  Selectors aren't always unique, remove the duplicates here. :nth-of-type to make all selectors unique could be added here.
                    
                    current_selector = current_element.name + current_selector;
                    
                    if (typeof used_selectors[current_selector] === "undefined") {
                        used_selectors[current_selector] = true;
                        css_selectors.push(current_selector);
                    }
                    
                    
                } else {
                    
                    if (typeof current_attribs.id !== "undefined" && current_attribs.id.indexOf(' ') == -1 && current_attribs.id.replace(/\s/g, '').length && !/[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g.test(current_attribs.id)) {
                        
                        current_selector = " > #" + current_attribs.id + current_selector;
                        
                    } else if (typeof current_attribs.class !== "undefined" && current_attribs.class.indexOf(' ') == -1 && current_attribs.class.replace(/\s/g, '').length && !/[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g.test(current_attribs.class)) {
                        
                        current_class = current_attribs.class;
                        normalized_class = current_class.split(" ").join(".");
                        
                        current_selector = " > ." + normalized_class + current_selector;
                        
                    } else {
                        
                        if (current_element.name.indexOf(':') == -1) {
                            current_selector = " > " + current_element.name + current_selector;
                        }
                        
                    }
                    
                    current_element = current_element.parent;
                    current_attribs = current_element.attribs;
                    
                }
                
            } while (not_top_element == true);
    
        }
        
        return css_selectors;
        
    }
    
    var selectors = return_selectors(parsed_html[0]);
    
    callback(null, selectors, parsed_html);
    
    

}