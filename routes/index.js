/*
 * @Author: your name
 * @Date: 2021-04-04 00:43:28
 * @LastEditTime: 2021-05-18 23:35:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /text-search-api/routes/index.js
 */
const router = require('koa-router')()
const searchHandle = require('../src/search-handle');
//文本搜索
router.get('/search', async (ctx, next) => {
  let searchStr = ctx.query.searchStr || "";
  let filePath = ctx.query.filePath || "";
  let page = ctx.query.page || 1;
  // 检索文件数量
  let pageSize = ctx.query.pageSize || 1;  
  let contentLength = ctx.query.contentLength || 300;
  if (!searchStr || searchStr === 0) {
    ctx.body = {
      code: 0,
      data: {},
      mesg: 'empty request'
    }
    return
  }

  ctx.body = {
    code: 0,
    data: searchHandle.getSearchList(searchStr, page - 1, pageSize, contentLength,filePath),
    mesg: 'success'
  }

})

module.exports = router