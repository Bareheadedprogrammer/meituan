const reptile = require('koa-router')();
const axios = require('axios');
const cheerio = require('cheerio');

reptile.get('/home',async ( ctx, next )=>{
    const params = ctx.query;
    const url = encodeURI(params.keyword)
    const json = await axios.get(`https://bj.meituan.com/s/${url}`)
    const $ = cheerio.load(json.data)
    ctx.body = "服务器拒绝请求"
})

module.exports = reptile.routes();