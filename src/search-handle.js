/*
 * @Author: zhouyijun
 * @Date: 2021-04-04 01:05:06
 * @LastEditTime: 2021-05-18 23:45:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /text-search-api/src/text-search.js
 */
const fileHandle = require('./file-handle')
const defaultFilePath = "/Users/zhouyijun/private/test/"
const search = {
    // 获取单个文件的搜索内容
    searchContent: function (fileName, contentStr, contentLength = 300) {
        let fileContent = fileHandle.readFile(fileName);
        let startIndex = 0;
        let result = [];
        while (startIndex + contentLength < fileContent.length) {
            let findIndex = fileContent.indexOf(contentStr, startIndex)
            if (findIndex === -1) {
                startIndex = startIndex + contentLength;
                continue
            }
            let start = findIndex - contentLength < 0 ? 0 : findIndex - contentLength
            let end = findIndex + contentLength > fileContent.length - 1 ? fileContent.length : findIndex + contentLength
            result.push(fileContent.substr(start, end - start));
            startIndex = end + 1;
        }
        return result;
    },
    // {filename:['','']} 获取文件列表
    getSearchList(contentStr, start = 0, limit = 1, contentLength = 300, filePath) {
        let fileList = fileHandle.readDir(filePath || defaultFilePath);
        let res = {
            pageNum: start,
            totalPages: fileList.length,
            fileList: {}
        };
        let i = start;
        let j = i;

        while (i < parseInt(start) + parseInt(limit) && j < fileList.length) {
            let fileName = fileList[j];
            let item = this.searchContent(fileName, contentStr, contentLength)
            if (item.length > 0) {
                res.fileList[fileName] = item;
                i++;
            }
            j++;
        }
        return res;
    }





}
module.exports = search;