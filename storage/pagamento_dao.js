function pagamento_dao(connection) {
    this._connection = connection;
}

pagamento_dao.prototype.save = function(obj,callback) {
    // this._connection.query('INSERT INTO dev.pagamentos SET ?', obj, callback);
    this._connection.query(
    	'INSERT INTO dev.pagamentos(forma_de_pagamento, valor, moeda, status, data, descricao ) values($1,$2,$3,$4,$5,$6)',
    	[
    		obj.forma_de_pagamento,
			obj.valor,
			obj.moeda,
			obj.status,
			obj.data,
			obj.descricao,
    	],
    	callback
    );
}

pagamento_dao.prototype.list = function(callback) {
    this._connection.query('select * from dev.pagamentos',callback);
}

pagamento_dao.prototype.get = function (id,callback) {
    this._connection.query("select * from dev.pagamentos where id = ?",[id],callback);
}

module.exports = function(){
    return pagamento_dao;
};