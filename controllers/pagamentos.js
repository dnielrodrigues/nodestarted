/**
 * legend
 * -----------------------------------------------------------------------------
 * 
 * rq: 	request
 * rs: 	response
 * e: 	error
 * r: 	result
 * 
 */

module.exports = function(app){

	app.get('/pagamentos',function(rq,rs){
		console.log('received GET:3000/pagamentos');
		rs.send('<h1>Pagamentos</h1>');
	});

	app.post('/pagamentos/pagamento',function(rq,rs){

		// declare
		var body = rq.body || {};
		var connection = app.storage.connection_factory();
		var dao = new app.storage.pagamento_dao(connection);

		// begin
		body.status = 'CRIADO';
		body.data = new Date;

		// end
		dao.save(body, function(e,r){

			if (e) {
				console.log('Erro no banco: ' + e);
				rs.status(400).send(e); return;
			}
			rs.json(body);
		});

	});

}