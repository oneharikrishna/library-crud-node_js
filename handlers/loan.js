const express = require('express');
const {query} = require('../utils/mysql.js');
const router = express.Router();
const axios = require('axios');

router.get(`/loans`,(req,res) => {
    let queryStatement = `SELECT * FROM loans`;
    query(queryStatement).then((response) => {
        if(response['status']) 
            res.send(response['result']);
    })
    .catch((err) => {
        res.send(`Error`);
    })
})

router.get(`/loans/:loanId`,(req,res) => {
    let queryStatement = `SELECT * FROM loans WHERE loan_id = ${req.params.loanId}`;
    query(queryStatement).then((response) => {
        if(response['status']) {
            if(response['result'].length === 0)
                res.send(`No Loan found with this Id`);
            else
                res.send(response['result']);
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(`Error`);
    })
})

router.post(`/loans`,(req,res) => {
    const {bookId, memberId} = req.body;
    axios.get(`http://localhost:8080/book/${bookId}`).then((apiResponse) => {
        let bookStatus = apiResponse.data.status;
        if(bookStatus === 'available'){
            let queryStatement = ``;
            query(queryStatement).then((response) => {
                
            })
            .catch((err) => {

            })
        }
        else{
            res.send(`Book already issued`);
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(`Error`);
    })
})

module.exports = router;
