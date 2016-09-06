module.exports = function(remove_selectors, callback) {
    // remove_selectors = array with objects. Properties: selector, text
    //  TO DO: generalize these selectors (callback in the same format as input with hopefully less objects)
    
    var current_selector = remove_selectors[0].selector;
    var generalized_selectors = [current_selector];
    
    for (var i=1;i<remove_selectors.length;i++) {
        
        if (remove_selectors[i].selector.indexOf(current_selector) === -1) {
            current_selector = remove_selectors[i].selector;
            console.log(current_selector);
            generalized_selectors.push(remove_selectors[i]);
        }
        
    }
    
    callback(null, generalized_selectors);
    
}