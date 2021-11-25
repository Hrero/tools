# jd打包工具

### 打包
```
tbjd build
```

### 生成表
```
tbjd autotable
```

#### 模版变量
```
TABLENAME 数据库名
NAME 项目名
TAG b/s
API 接口
ROUTER 映射地址
```

#### 本地命令
```
node ./bin/tbjd.js init   \
-s /Users/haozengrun/jd_code/bcj-s/main.js  \
-o /Users/haozengrun/jd_code/tools/outTest  \
-n bcj \
-t s 


node ./bin/tbjd.js init   \
-s /Users/haozengrun/jd_code/bcj-s/main.js  \
-o /Users/haozengrun/jd_code/jd-bcj  \
-n bcj \
-t s 


tbjd init   \
-s /Users/haozengrun/jd_code/bcj-s/main.js  \
-o /Users/haozengrun/jd_code/jd-bcj  \
-n bcj \
-t s 

```
