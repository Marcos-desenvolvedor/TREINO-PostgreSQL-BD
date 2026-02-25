require("dotenv").config();

const db = require("./db.js");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Funcionando!",
  });
});

app.get("/clientes", async (req, res) => {
  const clientes = await db.selecetCustomers();
  res.json(clientes);
});

app.post("/clientes", async (req, res) => {
  await db.insertCustomers(req.body);
  res.sendStatus(201);
});

app.listen(port);

console.log("Backend rodando");
