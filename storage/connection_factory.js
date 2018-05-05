var pg = require('pg');

function connect(){

	var client = new pg.Client({
		host: 'localhost',
		port: 5432,
  		user: 'homestead',
  		password: 'secret',
  		database: 'nodestarted'
  	});
	client.connect();
	return client;
}

module.exports = function(){ return connect }



