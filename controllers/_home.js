module.exports = function(app){
	app.get('/',function(req,res){
		console.log('received GET:3000');
		res.send('<h1>Bem Vindo</h1>');
	});
}