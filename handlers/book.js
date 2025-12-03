const express = require('express');
const {query} = require('../utils/mysql.js');
const e = require('express');
const router = express.Router();

router.get(`/book`,(req,res) => {
    const queryStatement = `SELECT * FROM books`;
    query(queryStatement).then((response) => {
        res.send(response['result']);
    })
    .catch((err) => {
        console.log(err);
        res.send("Error");
    })
});

router.get(`/book/:bookId`,(req,res) => {
    let queryStatement = `SELECT * FROM books WHERE book_id = ${req.params.bookId}`;
    query(queryStatement).then((response) => {
        if(response['result'].length === 0)
        res.send("No Book Found in this Id");
        else
        res.send(response['result'][0]);
    })
    .catch((err) => {
        console.log(err);
        res.send("Error");
    })
});

router.post(`/book`,(req,res) => {
    const {title, author, genre, publishedYear} = req.body;
    let queryStatement = `INSERT INTO books (title, author, genre, published_year) VALUES("${title}","${author}","${genre}","${publishedYear}")`;
    query(queryStatement).then((response) => {
        if(response['status']) {
            res.send(`Book added to the library. Id is ${response['result'].insertId}`);
        }
    })
    .catch((err) => {   
        res.send(err);
    });
})

router.put(`/book/:bookId`,(req,res) => {
    const {title, author, genre, publishedYear} = req.body;
    let queryStatement = `UPDATE books SET`;
    if(title)
        queryStatement += ` title = '${title}',`;
    if(author)
        queryStatement += ` author = '${author}',`;
    if(genre)
        queryStatement += ` genre = '${genre}',`;
    if(publishedYear)
        queryStatement += ` published_year = '${publishedYear}'`;
    
    if(queryStatement.endsWith(","))
        queryStatement = queryStatement.replace(/,$/,"");

    queryStatement += ` WHERE book_id = ${req.params.bookId}`;

    query(queryStatement).then((response) => {
        if(response['status']) {
            if(response['result'].affectedRows > 0)
            res.send(`Book Id ${req.params.bookId} updated`);
            else
            res.send(`No Book is updated`);
        }
    }).catch((err) => {
        console.log(err);
        res.send("Error");
    })

})

router.delete(`/book/:bookId`,(req,res) => {
    let queryStatement = `DELETE FROM books WHERE book_id = ${req.params.bookId}`;
    query(queryStatement).then((response) => {
        if(response['status']){
            if(response['result'].affectedRows > 0)
                res.send(`Book ${req.params.bookId} is deleted`);
            else
                res.send(`No Book is deleted`);
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

module.exports = router;