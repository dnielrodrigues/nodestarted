

module.exports = function(app){
	app.get('/pagamentos',function(req,res){
		console.log('rota: /teste');
		res.send('OK...');
	});
}