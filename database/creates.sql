create schema dev;
set search_path to dev;


CREATE TABLE IF NOT EXISTS pagamentos (
    id SERIAL NOT NULL,
    forma_de_pagamento VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    moeda VARCHAR(3) NOT NULL,
    status VARCHAR(255) NOT NULL,
    data DATE,
    descricao TEXT,

    PRIMARY KEY (id)
);