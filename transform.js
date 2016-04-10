var program = require('commander');
var PatternMatch = require('./PatternMatch')
var fs = require('fs')
program
	.option('-p, --pattern <pattern>', 'Input Pattern such as . ,')
	.parse(process.argv);



var inputStream = fs.createReadStream('input-sensor.txt')
var patternStream = inputStream.pipe(new PatternMatch(program.pattern))

patternStream.on('readable',function(){
	var line 
	
	while(null !=(line = patternStream.read())){
		console.log(line.toString('ascii'))
	}

}

	)
