const mysql = require('mysql');

function getConnection(){
    let con = mysql.createConnection({
   
        host: "localhost",
        user: "alielhaj_ali",
        password: "aliali2021",
        database: "alielhaj_quotes"      
        
    });
    return con;
}
module.exports.getConnection = getConnection;