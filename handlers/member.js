const express = require('express');
const {query} = require('../utils/mysql.js');
const router = express.Router();

router.get(`/members`,(req,res) => {
    let queryStatement = `SELECT * FROM members`;
    query(queryStatement).then((response) => {
        if(response['status'])
            res.send(response['result']);
    })
    .catch((err) => {
        console.log(err);
        res.send(`Error`);
    })

})

router.get(`/members/:memberId`,(req,res) => {
    let queryStatement = `SELECT * FROM members WHERE member_id = ${req.params.memberId}`;
    query(queryStatement).then((response) => {
        if(response['result'].length === 0)
            res.send(`No member found with this ID`);
        else
            res.send(response['result']);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

router.post(`/members`,(req,res) => {
    const {name, phone, email} = req.body;
    let today = new Date();
    let date = today.getDate() < 10 ? `0`+`${today.getDate()}` : today.getDate();
    let month = today.getMonth()+1 < 10 ? `0`+`${today.getMonth()+1}` : today.getMonth()+1;
    let joinDate = `${date}-${month}-${today.getFullYear()}`
    let queryStatement = `INSERT INTO members (name, phone, email, join_date) VALUES('${name}','${phone}','${email}','${joinDate}')`;
    query(queryStatement).then((response) => {
        if(response['status'])
            res.send(`Member added Id is ${response['result'].insertId}`)
    })
    .catch((err) => {
        if(err.error.sqlMessage.includes("Duplicate entry") && err.error.sqlMessage.includes("email"))
            res.send(`Email Id already exists`);
        else if(err.error.sqlMessage.includes("Duplicate entry") && err.error.sqlMessage.includes("phone"))
            res.send(`Phone number already exists`)
        else
            res.send(`error`);
    })
})

router.put(`/members/:memberId`,(req,res) => {
    const {name, phone, email} = req.body;
    let queryStatement = `UPDATE members SET`;
    if(name)
        queryStatement += ` name = '${name}',`;
    if(phone)
        queryStatement += ` phone = '${phone}',`;
    if(email)
        queryStatement += ` email = '${email}'`;

    if(queryStatement.endsWith(','))
        queryStatement = queryStatement.replace(/,$/,"");

    queryStatement += `WHERE member_id = '${req.params.memberId}'`;

    query(queryStatement).then((response) => {
        if(response['status']) {
            if(response['result'].affectedRows > 0)
                res.send(`Member Id ${req.params.memberId} updated`);
            else
                res.send(`No member updated`);
        }
    })
    .catch((err) => {
        let errMessage = err.error.sqlMessage;
        if(errMessage.includes("Duplicate entry") && errMessage.includes("phone")) 
            res.send(`Phone number already exits`);
        else if(errMessage.includes("Duplicate entry") && errMessage.includes("email"))
            res.send(`Email Id already exits`);
        else
            res.send(`error`);
    })
})

router.delete(`/members/:memberId`,(req,res) => {
    let queryStatement = `DELETE FROM members WHERE member_id = ${req.params.memberId}`;
    query(queryStatement).then((response) => {
        if(response['status']) {
            if(response['result'].affectedRows > 0) 
                res.send(`Member ${req.params.memberId} deleted`);
            else 
                res.send(`No member deleted`);
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(`Error`);
    })
})

module.exports = router;