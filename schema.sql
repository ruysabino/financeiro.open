DROP TABLE IF EXISTS titles;
CREATE TABLE titles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parceiro TEXT NOT NULL,
  data TEXT,
  vencimento TEXT,
  atraso INTEGER,
  documento TEXT,
  vendedor TEXT,
  valor REAL NOT NULL DEFAULT 0,
  movimento TEXT,
  renegociados TEXT,
  banco TEXT,
  titulo TEXT,
  historico TEXT
);
CREATE INDEX idx_titles_parceiro ON titles(parceiro);
CREATE INDEX idx_titles_vencimento ON titles(vencimento);
CREATE INDEX idx_titles_vendedor ON titles(vendedor);
CREATE INDEX idx_titles_titulo ON titles(titulo);
CREATE INDEX idx_titles_movimento ON titles(movimento);
CREATE INDEX idx_titles_renegociados ON titles(renegociados);
