BEGIN TRANSACTION;

-- config UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- users table
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  login VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  doc VARCHAR(14) UNIQUE,
  pass VARCHAR(255) NOT NULL,
  token VARCHAR(255),

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE aplicativos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE entidades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  cod VARCHAR(8) UNIQUE NOT NULL,
  doc VARCHAR(14) UNIQUE,

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE acoes(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  aplicativo_id UUID NOT NULL,
  path VARCHAR(255),
  method VARCHAR(7),

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,

  FOREIGN KEY (aplicativo_id) REFERENCES aplicativos(id) ON DELETE CASCADE,
  CONSTRAINT unique_acao UNIQUE (aplicativo_id, path, method)
);

CREATE TABLE permissoes(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL,
  aplicativo_id UUID NOT NULL,
  entidade_id UUID NOT NULL,
  acao_id UUID NOT NULL,

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (aplicativo_id) REFERENCES aplicativos(id) ON DELETE CASCADE,
  FOREIGN KEY (entidade_id) REFERENCES entidades(id) ON DELETE CASCADE,
  FOREIGN KEY (acao_id) REFERENCES acoes(id) ON DELETE CASCADE,
  CONSTRAINT unique_usuario_permission UNIQUE (usuario_id, aplicativo_id, entidade_id, acao_id)
);

INSERT INTO usuarios (
  id,
  nome,
  login,
  email,
  doc,
  pass,
  createdAt,
  updatedAt
) VALUES(
  '28595aed-992b-432f-87a2-438396344ed2',
  'root',
  'root',
  'admin@aspec.com.br',
  '00123456789',
  '$2b$10$mdXQWq/Ed80Ermq2.PfYpOYP.gSd1hd8pfkEUExMkbtv.wUCg.2lq',
  '2025-08-26 05:56:16.939',
  '2025-08-26 05:56:16.939'
);

COMMIT;
