const Sequelize = require('sequelize');
const db = require('../lib/db');//引入数据库配置信息

const Shi = db.define('tang_shi', {//创建一个User对象，info是表名
    id: {
        field: 'id',//对应数据库的名字
        primaryKey: true,//自增
        type: Sequelize.INTEGER,//类型
    },
    author: {
        field: 'author',
        type: Sequelize.STRING(50),
    },
    content: {
        field: 'content',
        type: Sequelize.STRING(200),
    },
    pingze: {
        field: 'strains',
        type: Sequelize.STRING(200),
    }
},{
    tableName: 'tang_shi',//表名
    timestamps: false,//默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。请注意，如果您使用Sequelize迁移，则需要将createdAt和updatedAt字段添加到迁移定义中
    freezeTableName: true// 默认false修改表名为复数，true不修改表名，与数据库表名同步
});

module.exports = Shi;


// const Model = Sequelize.Model;
// class User extends Model {}
// User.init({
//   // 属性
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: Sequelize.STRING
//     // allowNull 默认为 true
//   }
// }, {
//   sequelize,
//   modelName: 'user'
//   // 参数
// });