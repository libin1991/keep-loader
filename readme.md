# keep-loader for webpack

## 描述

keep-loader用于在不同的打包环境下需要生成不同的代码的场景，就像C/C++中的宏特性一样。

## 使用

1. 安装 keep-loader 

   ```javascript
   npm install keep-loader --save-dev
   ```

2. 修改webpack配置文件

   ```javascript
   module: {
    ...
       rules: [
       ...
         {
           test: /\.js$/,
           use: [
             {
               loader: '../../keep-loader',
               options:{
                 keep:process.env.NODE_ENV === 'production'?"prod":"dev"
               }
             },
             {loader: 'babel-loader'}
           ],
           include: [resolve('src'), resolve('test')]
         },
         ...
         ]
       ...  
    }
   ```

现在，你在代码里可以直接使用 `KEEP`  函数 , 例如:

```javascript
var env=""
KEEP("dev",e=>{
  console.log("我将会在dev构建过程中保留,其它环境构建过程中被移除")
  env="production"
})
KEEP("prod",e=>{
  console.log("我将会在prod构建过程中输出,其它环境构建过程中被移除")
  env="production"
})
console.log(env)
//在dev环境中输出 "development" , 在prod环境中输出"production" .
```

### KEEP(env,callback)

此函数在keep-loader中动态定义，你不必手动定义。

- env : 要保留代码的环境，值必须和webpack配置中keep-loader的options的keep值相匹配。另外，env必须是一个字符串直接量，而不能是变量！因为，keep-loader实在构建过程中处理js源码，而不是在执行过程中。
- callback: 要保留的源码回调； 保留的回调会就地立即执行。

### 示例

1.比如我们在开发环境时静态资源用我们本地的，而线上环境是直接引用cdn，那么我们可以写一个获取基地址的函数：

```javascript
function getAssetBaseUrl(){
  var baseUrl="http://localhost/static"
  KEEP("prod",()=>{
    baseUrl="http://cdn.xxx.com/static"
  })
  return baseUrl;
}
```

2. 比如我们要在测试环境开启日志，而在生产环境关闭日志，那么我们可以写一个log函数：

```javascript
function log(){
   var arg=arguments;
   KEEP("dev",()=>{
    console.log.apply(console,arg)
  })
}
```

