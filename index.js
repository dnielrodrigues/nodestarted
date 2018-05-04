/**
 * legend
 * -----------------------------------------------------------------------------
 * 
 * app: 		aplicacao principal
 * req: 		request
 * res: 		response
 * 
 * 
 */



// dependencias
var express = require('express');
var app = express();


// host
app.listen(3000,function(){
	console.log('Rodando...');
});


// routes
app.get('/teste',function(req,res){
	console.log('rota: /teste');
	res.send('OK...');
});

