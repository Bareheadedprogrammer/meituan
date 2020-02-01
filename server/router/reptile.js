const reptile = require('koa-router')();
const axios = require('axios');
const cheerio = require('cheerio');

reptile.get('/home',async ( ctx, next )=>{
    const params = ctx.query;
    const url = encodeURI(params.keyword)
    const json = await axios.get(`https://bj.meituan.com/s/${url}`)
    console.log(json)
    const $ = cheerio.load(json.data)
    const list = $('.common-list-main').text()
    console.log(list)
    ctx.body = 'index'
})

module.exports = reptile.routes();