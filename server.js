const express = require('express');
const port = process.env.port || 8080;
const indexRouter = require('./handlers/index.js');
const bookRouter = require('./handlers/book.js');
const memberRouter = require('./handlers/member.js');
const loanRouter = require('./handlers/loan.js');

const app = express();
app.use(express.json());

app.listen(port,() => {
    console.log("Welcome to Library CRUD operations via API");
})

app.use('',indexRouter);
app.use('',bookRouter);
app.use('',memberRouter);
app.use('',loanRouter);