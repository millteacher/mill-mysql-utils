let app=require('../index.js');
app.simpleConfig({
		host:'192.168.99.254',
		database:'twdrp',
		user:'root',
		password:'root'
})
app.getQuery("SELECT * from information_schema.`COLUMNS` where table_schema=?",['twdrp'])
.then(function (data) {
	console.log(data.rows);
},function (msg) {
	console.log(msg.data);
});