## 安装pm2
npm install -g pm2
yarn install

## 运行已配置好的
process.json   4个实例

## 运行
pm2 start process.json --env development

运行--prod
pm2 start process.json --env prod


## doc
npm run doc

## 请求地址
http://127.0.0.1:1991/app/gushi?page=10
http://127.0.0.1:1991/app/author?page=10


### tree 生成目录结构
######  安装
cnpm i tree-node-cli -g

###### 生成目录
-L 是确定要几级目录，-I是排除哪个文件夹下的
tree -L 4 -I "node_modules" > mulu.md
