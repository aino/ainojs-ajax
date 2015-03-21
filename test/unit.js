var Ajax = require('../index.js')
var sinon = require('sinon')
var chai = require('chai')

var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('Requests', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest()
    this.requests = []
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr)
    }.bind(this)
  })
  afterEach(function() {
    this.xhr.restore()
  })

  it('should parse fetched data as JSON', function(done) {
    var data = { foo: 'bar' }
    var dataJson = JSON.stringify(data)
    Ajax.get('/').then(function(result) {
      result.should.deep.equal(data)
      done()
    })
    this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson)
  })

  it('should send given data as JSON body', function() {
      var data = { hello: 'world' }
      var dataJson = JSON.stringify(data)
      Ajax.post('/', data)
      this.requests[0].requestBody.should.equal(dataJson)
  })

  it('should return error into promise', function(done) {
      Ajax.get('/').catch(function(err) {
        err.should.exist
        done()
      })
      this.requests[0].respond(500)
  });
})