module.exports = function(remove_selectors, callback) {
    
    console.log("Generalizing selectors...");
    
    var generalized_selectors = [remove_selectors[0]];
    var main_selector = remove_selectors[0];
    
    for (var i=0; i<remove_selectors.length; i++) {
        
        if (remove_selectors[i].indexOf(main_selector) == -1) {
            //  New selector, add it to generalized_selectors and check if it has more 'children'.
            
            main_selector = remove_selectors[i];
            generalized_selectors.push(main_selector);
            
        }
        
    }
    
    console.log("Selectors generalized.");
    console.log(generalized_selectors);
    
}