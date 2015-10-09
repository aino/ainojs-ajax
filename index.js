var Promise = require('promise')

var cnt = 0

var parse = function (req) {
  var result
  try {
    result = JSON.parse(req.responseText)
  } catch (e) {
    result = req.responseText
  }
  return result
}

var xhr = function (type, url, data) {
  return new Promise(function(resolve, reject) {
    var XHR = window.XMLHttpRequest || ActiveXObject
    var request = new XHR('MSXML2.XMLHTTP.3.0')
    request.open(type, url, true)
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200)
          resolve(parse(request))
        else
          reject(parse(request))
      }
    }
    request.send(data)
  })
}

module.exports.post = function(url, data) {
  return xhr('POST', url, JSON.stringify(data))
}

module.exports.get = function(url) {
  return xhr('GET', url)
}

module.exports.jsonp = function(url, data, cbname, timeout) {
  cbname = cbname || 'callback'
  timeout = timeout || 15000
  return new Promise(function(resolve, reject) {
    if ( typeof window == 'undefined' )
      return reject('No document')
    var global = 'jsonp'+Date.now()+btoa(navigator.userAgent).replace(/[^\d]+/g,'')+(cnt++)
    var script = document.createElement('script')
    var params = ''
    var timer = setTimeout(function() {
      window[global] = function() {
        delete window[global]
      }
      document.body.removeChild(script)
      reject(timeout+'ms timeout reached without response.')
    }, timeout)
    if ( typeof data == 'object' ) {
      for ( var i in data )
        params += '&'+i+'='+data[i]
    }
    script.src = url+'?'+cbname+'='+global+params
    window[global] = function(response) {
      clearTimeout(timer)
      document.body.removeChild(script)
      delete window[global]
      resolve(response)
    }
    document.body.appendChild(script)
  })
}