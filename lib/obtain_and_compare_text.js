module.exports = function (selectors, html_pages, callback) {
    //  Return array containing objects which store the selectors which need to be removed together with their text.
    
    var $ = html_pages[0];
    var compare_array = [];
    var text = "";
    var tempArray = [];
    
    for (var i=0;i<selectors.length;i++) {
        
        text = $(selectors[i]).text();
        
        if (text == "" || !/\S/.test(text)) {
            continue;
        }
        
        compare_array.push({
            selector: selectors[i],
            text: text
        });
        
    }
    
    for (i=1; i<html_pages.length;i++) {
        
        $ = html_pages[i];
        tempArray = [];
        
        for (var j=0;j<compare_array.length;j++) {
            
            if (compare_array[j].text == $(compare_array[j].selector).text()) {
                tempArray.push({
                    selector: compare_array[j].selector,
                    text: compare_array[j].text
                });
            }
            
        }
        
        compare_array = tempArray;
        
    }
    
    callback(null, compare_array);
    
    
}