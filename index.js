const express = require('express');
const app = express();

const Database = require("@replit/database")



app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});


const db = new Database()


db.set("january", "31").then(() => {});


db.list().then(keys => {
  console.log(keys)  
});




let january = []
let february = []
let march = []
let april 
may
june
july
august
september
october
november
december