let app=require('../index.js');
app.simpleConfig({
		host:'192.168.99.254',
		database:'twdrp',
		user:'root',
		password:'root'
})
app.doQuery("SELECT * from information_schema.`COLUMNS` where table_schema=?",['twdrp'])
.then(function (rows,field) {
	console.log(rows);
},function (err,rows) {
	console.log(sql);
});