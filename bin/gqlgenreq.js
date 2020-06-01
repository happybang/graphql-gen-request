#!/usr/bin/env node
const program = require('commander');
const processBuild =require("../index")
function commaSeparatedList(value, dummyPrevious) {
  return value.split(',');
}
program
  .option('--remote [value]', 'graphql 远程地址')
  .option('--destDirPath [value]', '输出相对路径')
	.option('--maxLevel [value]', '输出graphql请求的最大层级数，从2级开始')
	.option('--H <items>', 'Header Array split by , such as xx:1', commaSeparatedList)
  .parse(process.argv);
const { remote, destDirPath, maxLevel = 4 ,H} = program;
console.log(remote, destDirPath, maxLevel,H)
processBuild(remote,maxLevel,destDirPath)