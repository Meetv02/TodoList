require("./db/conn");
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'public')));

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
