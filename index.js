const fs = require('fs');
const https = require('https');
const template = require("art-template")
const templateStr =require("./template")
const fetch = require('node-fetch');
const path = require('path');
const build =require("./build")
const { printSchema, buildClientSchema, introspectionQuery } = require('graphql/utilities');
const {generate}  = require("@graphql-codegen/cli");
var os = require('os');
 function processBuild(url,maxlevel, outputResolve) {
	const body = JSON.stringify({ query: introspectionQuery });
  const method = 'POST';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
	};
  try {
     fetch(url, {
      method,
      headers,
      body,
    }).then(r=>r.json()).then(resul=>{
			let b =buildClientSchema(resul.data);
			const tempDir = fs.mkdtempSync(os.tmpdir()+"/gqlauto-");
			fs.writeFileSync(path.join(tempDir,"/schema.all.graphql"),printSchema(b));
			let gens = [];
			let levels = []
			for(let i=2;i<=maxlevel;i++){
				levels.push(i);
				build({
					schemaFilePath:path.join(tempDir,"/schema.all.graphql"),
					destDirPath:path.join(tempDir,`/gql${i}`),
					depthLimit:i
				});
				gens.push(generate(
					{
						schema: url,
						documents: tempDir+`/gql${i}`+'/**/*.gql',
						generates: {
							[path.resolve(process.cwd() , outputResolve+"/sdk"+i+".ts")]: {
								plugins: ["typescript","typescript-operations","typescript-graphql-request"],
							},
						},
					},
					true
				))
			}
			Promise.all(gens).then(()=>{
				console.log("生成完毕！")
			});
			const render= template.compile(templateStr);
			fs.writeFileSync(path.resolve(process.cwd() , outputResolve+"requestHelper.ts"),render({
				levels:levels,
				url
			}));
		})
  } catch (e) {
  }
}
module.exports =processBuild;