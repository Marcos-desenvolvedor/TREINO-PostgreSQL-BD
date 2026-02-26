require("dotenv").config();

const db = require("./db.js");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json()); // PARA O CONSEGUIRMOS LER JSON

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

app.patch("/clientes/:id", async (req, res) => {
  await db.updateCustomers(req.params.id, req.body);
  res.sendStatus(200);
});

app.delete("/clientes/:id", async (req, res) => {
  await db.deleteCustomers(req.params.id);
  res.sendStatus(204);
});

app.listen(port);

console.log("Backend rodando");
