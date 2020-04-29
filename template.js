const templateStr = `
import { GraphQLClient } from 'graphql-request';
{{each levels}}import { getSdk as ApiLevel{{$value}} } from './sdk{{$value}}';
{{/each}}
const client = new GraphQLClient('{{url}}');
{{each levels}}
const Api{{$value}} = ApiLevel{{$value}}(client);{{/each}}
export default {
{{each levels}}  Api{{$value}},
{{/each}}
};
`
module.exports=templateStr;