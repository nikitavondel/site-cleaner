Start app from its root directory: `npm start`
Install app from its root directory: `npm install`

Test page is available at /test . Default port it runs on is 8080.

In order to send it some data you're supposed to make a post request to the service with a json object in the body such as:
```javascript
{
    "urls": ["website.com/job1", "website.com/job2", "website.com/job3", "website.com/job4"]
}
```

And the output will look like:
```javascript
{
    "suggestions": [
        {
            "selector": "html > body > #header",
            "text": "I'm a header"
        },
        {
            "selector": "html > body > #footer",
            "text": "I'm a footer"
        }    
    ]
}
```
This service looks at all elements in the given page, grabs the text of each element and then compares it for all pages. The service then creates a list of selectors which can be removed as their text didn't change and then tries to 'generalize' the selectors; meaning that it will attempt to change:
`
["html > body > footer > madeBy", "html > body > footer > email"]
`
to
`
["html > body > footer"]
`