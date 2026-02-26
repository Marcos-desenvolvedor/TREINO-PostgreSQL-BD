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

// SELECIONA OS USERS DO BD
async function selecetCustomers() {
  const client = await connect();
  const res = await client.query("SELECT * FROM clientes");
  return res.rows;
}

async function insertCustomers(customer) {
  const client = await connect();
  const sql = "INSERT INTO clientes(nome, email) VALUES ($1, $2)";
  const res = await client.query(sql, [customer.nome, customer.email]);
}

async function updateCustomers(id, customer) {
  const client = await connect();

  const sql = "UPDATE clientes SET nome=$1, email=$2 WHERE id=$3";
  const values = [customer.nome, customer.email, id];

  const res = await client.query(sql, values);
}

async function deleteCustomers(id) {
  const client = await connect();

  const sql = "DELETE FROM clientes WHERE id=$1";
  const values = [id];

  const res = await client.query(sql, values);
}

module.exports = {
  selecetCustomers,
  insertCustomers,
  updateCustomers,
  deleteCustomers,
};
