/*
 * @Author: your name
 * @Date: 2021-04-04 01:05:24
 * @LastEditTime: 2021-04-05 00:15:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /text-search-api/src/file-handle.js
 */
const fs = require('fs');
var iconv = require('iconv-lite');
const fileHandle = {
    /**
     * @description: 读取文件目录，递归获取文件名称，包含子文件夹名称，用‘/’分割
     * @param {*}
     * @return {*}
     */
    readDir: function (filePath) {
        let fileList = fs.readdirSync(filePath);
        let rlist = []
        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].charAt(0) === '.') {
                continue
            }
            rlist = rlist.concat(this.getFileName(filePath + fileList[i]))
        }
        return rlist
    },
    /**
     * @description: 读取文件
     * @param {*} name
     * @return {*}
     */
    readFile: function (name) {
        let str = fs.readFileSync(name);
        if (str[0] == 0xff && str[1] == 0xfe) {
            return str;
        } else if (str[0] == 0xfe && str[1] == 0xff) {
            return str;
        } else if (str[0] == 0xef && str[1] == 0xbb) {
            return fs.readFileSync(name, 'utf8');
        } else {
            return iconv.decode(str, 'gbk');

        }
    },
    /**
     * @description: 获取文件名称，传入目录名，返回该目录下的所有文件名列表
     * @param {*} 
     * @return []
     */
    getFileName(name) {
        let obj = fs.statSync(name)
        if (obj.isDirectory()) {
            let fileList = fs.readdirSync(name);
            let rlist = [];
            for (let i = 0; i < fileList.length; i++) {
                rlist = rlist.concat(this.getFileName(name + '/' + fileList[i]))
            }
            return rlist;
        } else {
            return [name]
        }
    }

}


module.exports = fileHandle;