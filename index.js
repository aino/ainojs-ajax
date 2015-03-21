var Promise = require('promise')

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