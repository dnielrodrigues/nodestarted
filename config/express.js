var express 		= require('express');
var consign 		= require('consign');
var body_parser 	= require('body-parser');

module.exports = function(){
	var app = express();

	// bodyParser - parser de requisicoes HTTP
	app.use(body_parser.json());
	app.use(body_parser.urlencoded({extended:true}));

	// consign - gerenciar escopo de arquivos
	consign()
		.include('controllers')
		.then('storage')
		.into(app);

	return app;
}