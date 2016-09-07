module.exports = function(generalized_selectors, callback) {
    
    for (var i=0;i<generalized_selectors.length;i++) {
        
        generalized_selectors[i].text = generalized_selectors[i].text.replace(/\s{2,}/g,' ');
        
        console.log(generalized_selectors[i].selector);
        
    }
    
    callback(null, generalized_selectors);
    
}