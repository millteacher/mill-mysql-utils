let simpleConn=require("./app/GetConn.js");

module.exports={
	doQuery:simpleConn.doQuery,
	getQuery:simpleConn.getQuery,
	simpleConfig:simpleConn.config
};