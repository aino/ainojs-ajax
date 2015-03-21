var Ajax = require('../index.js')
var sinon = require('sinon')
var chai = require('chai')

var assert = chai.assert
var expect = chai.expect
var should = chai.should()

var xhr, requests

describe('Requests', function() {
  before(function () {
    xhr = sinon.useFakeXMLHttpRequest()
    requests = []
    xhr.onCreate = function (req) { 
      requests.push(req)
    }
  })

  after(function () {
    xhr.restore()
  })

  it("makes a GET request", function () {
    var callback = sinon.spy()
    Ajax.get('/').then(callback)
    assert(requests.length === 1, 'Request length is 1')
    expect(requests[0].url).to.equal('/')
  })
})