let Promise=require("promise");
let mysql=require('mysql');

/**
	处理mysql的简单链接及sql语句的执行
*/
function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
let connection=null;//数据库链接对象
let connConf={};//数据库链接配置
const connectioinStr=JSON.stringify({//在用户没有进行连接时提示的字符串
		host:'主机名',
		database:'数据库名',
		user:'用户名',
		password:'密码'
	});

//配置链接字符串
exports.config=function (conf) {
	if(isEmptyObject(conf))throw "参数不能为空";
	connConf=conf;
	connection=mysql.createConnection(connConf);
}
/**
	query的代理方法
*/
function proxyDoquery (){
	if(!connection){
		throw "请配置链接"+connectioinStr;
	}
	var arg=Array.prototype.slice.call(arguments, 0);
	return doquery.apply(this,arg);
}

var doquery=function  (sql,valuse) {
	var result={};
	connection.connect();//打开连接
	sql = mysql.format(sql, valuse);

	var result=new Promise(function (resolve,reject) {
		
		connection.query(sql,valuse,
			function  (err,rows,fields) {
			if(err){
				connection.end();//关闭链接
				reject(err,sql);
			}
			// console.log(fields);
			resolve(rows,fields);
		});
	})
	Promise.all([result]).then(function () {
		connection.end();//关闭链接
		console.log("链接已关闭");
	});
	return result;
}


exports.doQuery=proxyDoquery;

