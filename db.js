// TUDO QUE FOR RELATIVO/ESPECIFICO A BANCO DE DADOS COLOCAMOS AQUI

// FUNÇÃO DE CONEXÃO
async function connect() {
  // CASO JÁ EXISTIR A CONEXÃO A FUNÇÃO RETURN A CONEXÃO SEM PRECISAR FAZER TUDO DENOVO
  if (global.connection) {
    return global.connection.connect();
  }

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  const client = await pool.connect();
  console.log("CRIOU O POOL CONEXÃO");

  const res = await client.query("select now()");
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;
  return pool.connect();
}

connect();
