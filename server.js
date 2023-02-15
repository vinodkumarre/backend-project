const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3005;
const db = require('./db')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/books', db.getUsers);
app.get('/books/:name', db.getUserById)
app.post('/book', db.createUser);
app.put('/books/:name', db.updateUser);
app.delete('/books/:name', db.deleteUser);
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
});