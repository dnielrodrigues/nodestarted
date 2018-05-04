module.exports = function(app){
	app.get('/testes',function(req,res){
		console.log('rota: /testes');
		res.send('OK...');
	});
}