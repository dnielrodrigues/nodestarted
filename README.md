# Básico

´´´
´´´

Dependências Iniciais:  
´´´
sudo npm install -g nodemon
npm install --save express
npm install --save consign
npm install --save body-parser
npm install --save pg
npm install --save express-validator
´´´


Import básico:  
´´´
var express = require('express');
var app = express();
´´´


Executar servidor:
´´´
nodemon app.js
´´´



# Usando PgSQL

---



# Usando CURL

POST com saída no terminal:
´´´
curl http://localhost:3000/pagamentos/pagamento \
  	-X POST\
  	-v \
  	-H "Content-type: application/json" \
  	-d @docs/pagamento.json; echo
´´´

POST com formatação da saída:
´´´
curl http://dev.com:3000/pagamentos/pagamento \
  	-X POST\
  	-v \
  	-H "Content-type: application/json" \
  	-d @docs/pagamento.json | json_pp
´´´


