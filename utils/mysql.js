const mysql = require('mysql');

const con = mysql.createConnection({
    host : `localhost`,
    user : `root`,
    password : ``,
    port : 4306,
    database : `library_crud`
});

con.connect((err)=>{
    if(err) {
        console.log("Error connecting to database");
        console.log(err);
        process.exit(1);
    }
    console.log("Database connected successfully");
})

const query = (query) => {
    let response = {};
    return new Promise((resolve,reject) => {
        con.query(`${query}`,(err,results,fields) => {
            if(err) {
                response['status'] = false;
                response['error'] = err;
                reject(response);
            }
            else {
                response['status'] = true;
                response['result'] = results;
                resolve(response);
            }
        })
    });
}

module.exports = {query};