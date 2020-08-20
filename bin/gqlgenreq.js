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
	.option('--templatePath [value]', 'requestHelper template path')
	.option('--H <items>', 'Header Array split by , such as xx:1', commaSeparatedList)
  .parse(process.argv);
const { remote, destDirPath, maxLevel = 4 ,H,templatePath} = program;
console.log(remote, destDirPath, maxLevel,H);
const headers = {}
for(let h in H){
	headers[H[h].split(":")[0]]=H[h].split(":")[1];
}

processBuild(remote,maxLevel,destDirPath,headers,templatePath)
