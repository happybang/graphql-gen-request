#!/usr/bin/env node
const program = require('commander');
const processBuild =require("../index")
program
  .option('--remote [value]', 'graphql 远程地址')
  .option('--destDirPath [value]', '输出相对路径')
  .option('--maxLevel [value]', '输出graphql请求的最大层级数，从2级开始')
  .parse(process.argv);
const { remote, destDirPath, depthLimit = 4 } = program;
console.log(remote, destDirPath, depthLimit)
processBuild(remote,depthLimit,destDirPath)