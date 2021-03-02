require('dotenv/config');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Conectado na porta ${PORT}.`);
});
