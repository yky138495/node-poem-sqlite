/**
 * Created by Hom on 12/1/16.
 */

'use strict';

var Shi = require('../../model/shi');
var Author = require('../../model/author');


function gushi(req, res) {
  var page = req.query.page;
  var pageSize = req.query.pageSize;

  let count = pageSize || 20;
  // 查找所有用户
  Shi.findAll({ offset: page*count, limit: count }).then(Shis => {
    console.log("All users:", JSON.stringify(Shis, null, 4));
    var usersJson = JSON.stringify(Shis, null, 4);
    res.header('Cache-Control', 'no-cache');
    res.json({
      succeed: true,
      errorCode: '0000000',
      errorMessage: '成功',
      data:Shis,
      data1: {
        id:usersJson.id,
        shi: usersJson.content,
        title: usersJson.title
      }
    });
  });
}

function author(req, res) {
  var page = req.query.page;
  var pageSize = req.query.pageSize;
  var query = req.query;
  console.log(query);
  let count = pageSize || 20;
  // 查找所有用户
  Author.findAll({ 
    // where:query,
    offset: page*count, limit: count 
  }).then(Shis => {
    console.log("All users:", JSON.stringify(Shis, null, 4));
    var usersJson = JSON.stringify(Shis, null, 4);
    res.header('Cache-Control', 'no-cache');
    res.json({
      succeed: true,
      errorCode: '0000000',
      errorMessage: '成功',
      data:Shis,
      data1:query,
      data2: {
        id:usersJson.id,
        shi: usersJson.content,
        title: usersJson.title
      }
    });
  });
}
module.exports.gushi = gushi;
module.exports.author = author;