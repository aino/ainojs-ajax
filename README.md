Ajax
====

Minimal ajax library for JSON requests that returns a Promise.

Installation:
-------------

Using npm:

    npm install ainojs-ajax

In the browser:

- Download a release at https://github.com/aino/ainojs-ajax/releases
- Include the compiled file: ``<script src="ainojs-animation/dist/ainojs-ajax.min.js"></script>``

Usage example:

    Ajax.get('/').then(function(response) {
      console.log(response)
    })

    Ajax.post('/', { foo: 'bar' }).then(function(response) {
      console.log(response)
    })

Methods:
    
    // performs an ajax GET request to [url] and returns a promise
    Ajax.get(url)

    // performs an ajax POST request to [url] and returns a promise
    Ajax.post(url, [data])

    // performs JSONP request to [url] and returns a promise. 
    // callbackname defaults to "callback" and timeout to 15000ms 
    Ajax.jsonp(url, [data], [callbackname], [timeout]) 