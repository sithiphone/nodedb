const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'sithiphone', // root
    password: 'admin123',  // ''
    database: 'tplus'
});

db.connect((err) =>{
    if(err) throw err;
    console.log('ຖານຂໍ້ມູນຖືກເຊື່ອມຕໍ່ສໍາເລັດແລ້ວເດີ້');
});

module.exports = db;