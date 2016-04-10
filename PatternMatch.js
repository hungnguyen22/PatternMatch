
var Transform = require("stream").Transform
var inherits = require("util").inherits
var input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tempor arcu, quis hendrerit nunc accumsan quis. In ut dolor metus, eget viverra odio. Quisque sed suscipit leo. Curabitur dictum magna ut turpis interdum a mollis nunc condimentum. Praesent leo est, hendreriteget condimentum sit amet, placerat adipiscing neque. Curabitur id metus tellus, sed semper odio. Phasellus id justo ante, vel bibendum eros. Nulla suscipit felis eget erat iaculis et aliquam turpis consequat. Nunc posuere mollis tellus sit amet dapibus. Praesent sagittis quam sit amet mauris venenatis in dignissim purus dapibus.'
function PatternMatchs (options) {
  Transform.call(this, options)
  this.option = options
}

inherits(PatternMatchs, Transform)

PatternMatchs.prototype._transform = function (chunk, encoding, callback) {
  //console.log(chunk.toString('ascii'))
  var input = chunk.toString('ascii')
  this.push('------------Input------------')
  this.push(input)
  //console.log(data)
  var str = input.split(this.option)
  this._lastLineData = str.splice(str.length-1,1)[0]
  //this.push(str)
  this.push("------------OutPut------------")
  this.push('[')
  for(var value in str){
  	this.push("'"+str[value]+"'"+'.')
	}
   this.push(']')
  callback()
}
PatternMatchs.prototype._flush = function (callback){
	if (this._lastLineData) this.push(this._lastLineData)
    this._lastLineData = null
	callback()

}

module.exports = PatternMatchs
