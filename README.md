# 博学谷项目介绍文档
## [接口文档](http://doc.botue.com/)

## 项目结构：
bxg10/
    css/
        .less
    js/
        teacher/
            list.js
            add.js
        lib/        第三方独立的js文件
            jquery.js
            template-web.js
            echarts.js
    imgs/   存放图片
    tpls/   存放模板文件
        teacherAdd.html
        courseAdd.html
    assets/     存放第三方不仅仅有js，还有其他一系列文件的项目
        bootstrap/
    index.html  项目的主页(用requirejs管理的
    login.html  登录页(并不使用requirejs)

## bootstrap布局
+ 在bootstrap中给一个标签设置一个类名为text-center就可以自动实现文字水平居中
+ 按钮
    - 给一个按钮设置一个btn-success  -->按钮呈现绿色的背景
    - 。。。。。。。。。btn-block    -->按钮的宽度=容器的宽度


## jquery事件绑定
+ 每一次提交表单都会触发表单的submit事件
+ 如果想要阻止某个事件的默认行为：
    - 1、事件回调函数有一个参数，表示事件对象(e)，通过e.preventDefault()实现
    - 2、在事件回调函数最后：return false;

## 博学谷项目中模态框模板必须只能有一个根节点
+ 多一个文本，多一个注释都不行

## 登录练习可能产生错误
1. 查看login的http请求有没有发送
2. 查看请求的FormData核对有没有以下2个字段
    + tc_pass
    + tc_name
3. 核对字段的值

## 跨页面传值
+ get请求的参数
    - 在页面跳转的时候，把要传递的参数作为url请求路径的一部分
    location.href="index.html?id=666&age=18";
    + 在目标页面，通过location.search到相关参数
    location.search-->"?id=666&age=18"

+ h5中新增了本地存储技术：localStorage/sessionStorage
    - sessionStorage是会话级的存储时间  / localStorage永久存储

    - 存储数据：localStorage.setItem("键","值")
        - 切记：所有的值都应该是一个字符串类型的值，如果不是字符串类型，方法内部会把该值转换为字符串类型存储
            - 特殊情况：传递数字也可以  100-->"100"  "100"-->"100"

+ cookie
    - 前提：必须要在同一个域名下面的不同页面
    - cookie的2种类型：
        - 会话cookie：cookie会在每一次会话之后之后删除
        - 长期cookie：cookie保存一段时间
    - 原生JS：
        - 设置一个会话cookie：document.cookie="id=888";
        - 设置一个长期cookie：document.cookie="name=ccc;expires="+new Date("2017-09-12 08:00:00");
        - 获取cookie：document.cookie：获取到当前域名下面的所有cookie值
    - jquery.cookie.js操作cookie
        - jquery.cookie.js依赖于jquery
        - 设置一个会话cookie:$.cookie("键","值")
        - 设置一个长期cookie：$.cookie("键","值",{ expires:日期类型或者数字类型 })
        - 获取cookie：$.cookie("键")
        - 移除一个cookie：$.removeCookie("键")

+ 服务器端：session

## 对象的序列化和反序列化
+ JSON.stringify(对象)：将一个对象序列化为一个json数据
+ JSON.parse("json数据")：将一个json数据转化为一个对象


## 什么时候使用shim
+ shim只用于第三方模块
+ shim一般适用于：a、引入了2个第三方模块，b、之间存在依赖，c、其中一个不支持AMD规范
    - 例如：导入了jquery/bootstrap，bootstrap依赖了jquery，bootstrap不支持AMD规范，所以采用了shim

## 如果引用了2个第三方模块，2个第三方模块都支持AMD规范，那么就可以使用AMD规范中的写法
+ 把依赖项放在数组中
    - 举例
        - cart.js依赖了product.js+shop.js
        - 在cart.js文件中，通过以下代码实现模块依赖
        ```js
        define(["product","shop"],function(){})
        ```

## 项目类型
+ 企业级项目：企业内部员工，企业客户-->ERP/OA/CRM/CMS/财务网站
    - 所有的企业级项目都必须登录才能访问
+ 互联网项目：全部互联网用户

## 渲染讲师列表
+ 0、拼接DOM
+ 1、模板渲染
    - a、把页面结构放到模板中，写arttemplate的语法
        - <script id="tplTeacherList">
            <table>
                {{each result}}
                    //$value是数组中每一个元素
                    //要获取用户名：$value.tc_name
                    <tr>
                        <td>{{$value.tc_name}}</td>
                    </tr>
                {{/each}}
            </table>
        </script>
    - b、
        - i>通过ajax获取数据
            - $.ajax({ url:"/api/teacher",type:"get",success:function(res){
                //res：接受了接口的返回值：响应的结果

                - ii>var html=template("script的id",res);

                - c、把html添加到页面中指定位置：$(".main .content-container").html(html);
            } })


## requirejs中使用arttemplate模板引擎
+ 1、把代码放到项目中的指定位置
+ 2、配置模板引擎的路径
+ 3、在需要编译模板的文件中导入该模块，可以通过形参获取模板引擎的入口函数
```js
require(["template"],function(template){
    //这里的形参template就是arttemplate模板引擎的入口函数
    //1、常用的API
    //1.1、template(script的id,数据)
    //1.2、template.render(模板内容,数据)
    //

})
```

## 查看讲师实现思路：
1、找到功能的入口，点击查看按钮
    -->给每一个查看按钮绑定单击事件
        -->如何绑定事件？
            -->a、事件绑定在div.panel中，通过委托让每一个查看按钮触发：$("div.panel").on("click",".btn-show",function(){})
2、事件触发的时候，弹出模态框？
    -->a、先准备一个模态框的模板页面
    -->b、通过text插件获取模板页面的内容
    -->c、通过ajax获取该讲师的数据
        -->/api/teacher/view
        -->tc_id：在编译列表的时候把tc_id作为一个属性存储起来
    -->d、将数据通过arttemplate编译到模板中，获取到真实内容
    -->e、把内容以模态框的形式添加到页面中
        -->$(html).appendTo("body").modal();


## 老师可以把cookie再举多一个例子帮助消化吗?
### cookie的用法-->jquery.cookie.js
+ 设置一个会话cookie
    - $.cookie(键,值)		-->值应该是一个字符串类型或者数字类型
+ 设置一个长期cookie
    - $.cookie(键,值,{ expires:数字类型或者是日期类型的（过期时间） })
+ 获取一个cookie
    - $.cookie(键)
+ 移除cookie
    - $.removeCookie(键)

### cookie的用途
+ 保存一些需要在多个页面中访问的数据(>=2个页面)
    - 对于一些有效性要求很高的数据不能使用cookie存储，比如：表格中的数据
    - 可以保存当前登陆用户的一些信息：用户的头像、用户名、用户id，可能会在多个页面中访问
+ 不能保存安全性较高的内容
+ 保存的数据也是有限制的(不要保存数据太大的内容)
+ 后端：session 用来保存登录状态
+ 用户的id来进行判断当前用户是谁

## 对什么时候有返回值，要接收返回值不清楚。
+ 自己写的模块：如果按需加载的模块一定是通过返回值来实现，立即执行的代码有没有返回值都无所谓，如果分不清，所有的模块都有返回值
+ 第三方模块：
    - 日常没有requirejs，如果是全局函数作为功能的入口，那么如果该模块支持了AMD规范，那么一定是有返回值的，返回值就是那个全局函数
        - 例子：jquery/echarts/arttemplate
    - 第三方模块，不支持AMD规范，肯定没有返回值
    - 第三方模块，支持了AMD规范，但是它的入口是其他文件提供的，那么该模块也没有返回值，
        - jquery.cookie    $.cookie	入口就是：$，$是jquery贡献出来的，
        - bootstrap.js	    $().modal();   入口就是：$

## 面试题：
### call/apply的异同？
### localStorage/sessionStorage的区别
### h5新特性
### post/get请求之间的区别？
+ get请求的参数作为url地址的一部分
+ get请求相对不太安全，常用于传入一些安全性不高的参数(id)
+ get请求的地址受制于url长度的限制，参数大小有一定的限制

+ post请求的参数作为请求报文的一部分
+ post请求相对比较安全，常用语传入一些安全性较高的数据(密码、账号)
+ post请求的参数大小几乎没有限制

### localtion对象常用的属性、方法
+ location.href="页面地址"	页面跳转
+ location.reload();		页面刷新
+ location.search		获取get请求的参数	http://www.baidu.com?name=ccc&id=666-->"?name=ccc&id=666"
+ location.hash		获取锚点/锚名		http://www.baidu.com#ccc	-->"#ccc"
+ location.protocol		获取协议的名称		http://www.baidu.com	-->"http:"
+ location.pathname		获取路径名称

### ajax的优缺点
+ 异步刷新-->实现页面的局部刷新-->只刷新页面的一部分内容
                            -->减少了资源的重复加载
                                -->1、页面响应速度有一定的提升(提升了用户体验)
                                -->2、降低了服务器的压力(最重要)
+ 缺点：
    - 不能跨域          -->现在有了一些手段支持跨域：jsonp/反向代理/window.name
    - 对SEO不友好       SEO：搜索引擎优化
        - 百度是如何收录你的网站的？
        - 如果通过搜索一个标题就能看到你网站指定内容
            - 网络爬虫搜索某个网站的时候，不会执行任何JS代码-->ajax自然也不会执行
    - 不能进行页面导航( <- ->)

### 跨域的解决方案：([参考网站](http://www.cnblogs.com/2050/p/3191744.html))
+ jsonp
+ window.name
+ iframe
+ h5：window.postMessage


### cookie不能保存安全性较高的内容，因为这样的方式不安全
+ 不能保存密码，尤其是不能明文保存密码
    - 12306明文保存密码，数据库被攻陷了
+ 甚至在一些安全性做的比较好的网站中，通过http请求发送密码的时候，会浏览器端进行加密，然后加密传输；在服务器中进行加密，加密存储在数据库中