/**
 * Created by ymg on 12/1/21.
 */

'use strict';

var express = require('express');
var controller = require('./app.controller');
var validate = require('express-jsonschema').validate;

var router = express.Router();

/**
 * @api {get} app/gushi 古诗
 * @apiName gushi
 * @apiGroup app
 * @apiParam {Number} page
 * @apiParam {Number} pageSize
 * 
 * @apiSuccess {Boolean} succeed  成功标识
 * @apiSuccess {String} errorCode 结果码
 * @apiSuccess {String} errorMessage  消息说明
 * @apiSuccess {Object} data 数据
 * @apiSuccess {Number} data.id 编号
 * @apiSuccess {String} data.author  作者
 * @apiSuccess {String} data.content  内容
 * @apiSuccess {String} data.content  平仄对应
 * 
 * @apiSuccessExample {json} 开启
 *    HTTP/1.1 200 OK
 *    {
 *      "succeed": true,
 *      "errorCode": "0000000",
 *      "errorMessage": "成功",
 *      "data": [{
 *        "id": 11,
 *        "author": "文宗皇帝",
 * 		  "content": "風雲喜際會，雷雨遂流滋。薦幣虛陳禮，動天實精思。漸侵九夏節，復在三春時。霢霂垂朱闕，飄颻入綠墀。郊坰既霑足，黍稷有豐期。百辟同康樂，萬方佇雍熙。",
 *   	  "pingze": "平平仄仄仄，平仄仄平平。仄仄平平仄，仄平仄平○。仄平仄仄仄，仄仄○平平。仄仄平平仄，平平仄仄平。平平仄平仄，仄仄仄平○。仄仄平平仄，仄平仄○平。"
 *      }]
 *    }
 * @apiSuccessExample {json} 关闭
 *    HTTP/1.1 200 OK
 *    {
 *      "succeed": false,
 *      "errorCode": "0000001",
 *      "errorMessage": "--"
 *    }
 */
router.get('/gushi', controller.gushi);
/**
 * @api {get} app/author 作者
 * @apiName author
 * @apiGroup app
 * @apiParam {Number} page
 * @apiParam {Number} pageSize
 * 
 * @apiSuccess {Boolean} succeed  成功标识
 * @apiSuccess {String} errorCode 结果码
 * @apiSuccess {String} errorMessage  消息说明
 * @apiSuccess {Object} data 数据
 * @apiSuccess {String} data.id    编号
 * @apiSuccess {Number} data.name  作者名字
 * @apiSuccess {Number} data.desc  作者简介
 * 
 * @apiSuccessExample {json} 开启
 *    HTTP/1.1 200 OK
 *    {
 *      "succeed": true,
 *      "errorCode": "0000000",
 *      "errorMessage": "成功",
 *      "data": [{
 *        "id": 1,
 *        "name": "太宗皇帝",
 *        "desc": "帝姓李氏，諱世民，神堯次子，聰明英武。貞觀之治，庶幾成康，功德兼隆。由漢以來，未之有也。而銳情經術，初建秦邸，即開文學館，召名儒十八人爲學士。既即位，殿左置弘文館，悉引內學士，番宿更休。聽朝之間，則與討論典籍，雜以文詠。或日昃夜艾，未嘗少怠。詩筆草隸，卓越前古。至於天文秀發，沈麗高朗，有唐三百年風雅之盛，帝實有以啓之焉。在位二十四年，諡曰文。集四十卷。館閣書目，詩一卷，六十九首。今編詩一卷。"
 *      }]
 *    }
 * @apiSuccessExample {json} 关闭
 *    HTTP/1.1 200 OK
 *    {
 *      "succeed": false,
 *      "errorCode": "0000001",
 *      "errorMessage": "--"
 *    }
 */
router.get('/author', controller.author);

module.exports = router;