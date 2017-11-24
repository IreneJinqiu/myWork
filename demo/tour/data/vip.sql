#会员登录
#设置字符编码
set names utf8;
#删除数据库
drop database if exists vipUser;
#创建数据库
create database vipUser charset=utf8;
#进入数据库
use vipUser;
#创建用户表
#项目使用大整数代替date
create table user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(64),
	upwd VARCHAR(32)
);
#插入三行记录
INSERT INTO USER VALUES(NULL,"18687085113","081112");
INSERT INTO USER VALUES(NULL,"18687085112","081112");