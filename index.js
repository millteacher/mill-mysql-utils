let simpleConn=require("./app/GetConn.js");

module.exports={
	doQuery:simpleConn.doQuery,
	simpleConfig:simpleConn.config
};