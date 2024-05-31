const mysql = require('mysql');
var config = require('./config');

var db = mysql.createConnection({
    host: config.DB_HOST, 
    user: config.DB_USER, 
    password: config.DB_PASSWORD,
    database: config.DB_NAME
});

db.connect((err) =>{
    if(err) throw err;
    console.log('ຖານຂໍ້ມູນຖືກເຊື່ອມຕໍ່ສໍາເລັດແລ້ວເດີ້');
});

module.exports = db;