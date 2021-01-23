# 复习

## 存储

### 浏览器存储

**localStorage**

本地存储，存储大小为5mb，如果用户不手动删除，localStorage永久存储

使用场景：保存用户非敏感信息，记录用户偏好

```js
// 本地存储 localStorage
//设置本地存储
localStorage.setItem(key,value);
localStorage.getItem(key);
localStorage.removeItem(key);
//删除所有本地存储
localStorage.clear();
```

**sessionStorage**

会话存储，关闭即删除

使用场景：保存用户非敏感信息，记录用户偏好

```js
//会话存储所有方法和localStorage一致
sessionStorage.setItem(key,value);
sessionStorage.getItem(key);
sessionStorage.removeItem(key);
sessionStorage.clear()
```

**cookie**

> 设置cookie必须开启服务器(本地服务器后者公网服务器)

浏览器存储大小`IE` 2kb，其他4kb

```JS
//设置cookie时间,时间格式为格林威治时间
var time = new Date("2021-01-21 16:15:01").toUTCString();
console.log(time); // test.html:14 Thu, 21 Jan 2021 08:07:01 GMT
//设置cookie
document.cookie = "searchHistory = Luyouqi;expires = " + time;
document.cookie = "searchdory = Luyodqi;expires = " + time;

//获取cookie
var cookie = document.cookie;
console.log(cookie); // searchHistory=Luyouqi; searchdory=Luyodqi
var cookieDate = cookie.split(/\;\s*/);
console.log(cookieDate); // ["searchdory=Luyodqi", "searchHistory=Luyouqi"]

//转化成对象
var cookies = {};
for (var i = 0; i < cookieDate.length; i++) {
	var c = cookieDate[i].split("=");
	cookies[c[0]] = c[1];
}
console.log(cookies); // {searchdory: "Luyodqi", searchHistory: "Luyouqi"}

//删除cookie,给expires设置时间,到时间cookie自动删除
var time = new Date("2021-01-21 00:00:01").toUTCString();
//设置cookie
document.cookie = "searchHistory = Luyouqi;expires = " + time;
```

### 服务端存储

**session**

会话状态

保存用户登录状态，用于身份证验证

后台将sessionId返回到前端，将一串加密过后的字符串返回到前端

实时保存
    session需要配合cookie

多访问时，出现性能问题

**token**

可设置保存token有效时间，以一个加密的字符串保存在服务器端

用户使用过一个正确的用户名和密码，跟服务器换取一个合法，唯一token，服务器将合法token返回到前端，前端使用本地存储或者cookie或者会话存储保存token

下次去访问用户信息的页面，必须携带token到服务器，服务器截取token进行验证，如果验证通过，放行。否则拦截

## http常见状态码

200：请求被正常处理 
204：请求被受理但没有资源可以返回 
206：客户端只是请求资源的一部分，服务器只对请求的部分资源执行GET方法，相应报文中通过Content-Range指定范围的资源。 
301：永久性重定向 
302：临时重定向 
303：与302状态码有相似功能，只是它希望客户端在请求一个URI的时候，能通过GET方法重定向到另一个URI上 
304：发送附带条件的请求时，条件不满足时返回，与重定向无关 
307：临时重定向，与302类似，只是强制要求使用POST方法 
400：请求报文语法有误，服务器无法识别 
401：请求需要认证 
403：请求的对应资源禁止被访问 
404：服务器无法找到对应资源 
500：服务器内部错误 
502：服务器挂了
503：服务器正忙

## JS中出现undefined与null几种常见情况

**undefined**
    1.在变量提升(预解析)阶段，只声明未定义，默认值就是undefined
    2.在JS的严格模式下("use strict")，没有明确的主体，this值得就是undefined
    3.函数定义没有返回值（return或者return后面什么也不带），默认的返回值就是undefined
    4.函数定义形参不传值，默认就是undefined
    5.对象没有这个属性名，属性值默认就是undefined
    6.在数组的find方法中，没有找到的情况下是undefined  越界获取数组元素, 返回undefined

**null**
    1.手动设置变量的值或者对象某一个属性值为null此时不赋值，会在后面的代码中进行赋值，相当于初始化。）
    2.在JS的DOM元素获取中，如果没有获取到指定的元素对象，结果一般是null
    3.Object.prototype.__proto__的值也是null
    4.在正则捕获的时候，如果没有捕获到结果，默认也是null

## js中的六个假值

```js
// js中的六个假值
0 , null, undefined, false, ' ' , NaN

// 将任何一个数据转换成布尔
!!数据

// 数值
数值最大值 Number.MAX_VALUE;
数值最小值 Number.MIN_VALUE

判断一个数是否有效 isFinite(数据)

NaN: 不是一个数字的数值类型
NaN和任何数据比较都是返回false，包括NaN本身

判断一个数据是否为NaN  isNaN(数据)

保留小数位 toFixed(小数位)
```

## 数组API

**不修改原数组的API** 
1.join() 添加分隔符，默认为逗号
2.concat(数组1，数组2，...) 拼接成一个新数组 可用于数组深拷贝
3.slice(m, n) m为开始截取元素下标，n为截取到第n个元素也就是n - 1的下标 截取个数为n - m

**修改原数组的API**
1.push() 添加尾部元素
2.pop() 弹出一个尾部元素
3.unshift() 添加头部元素
4.shift() 弹出一个头部元素
5.splice(m, n) m为开始删除下标，n为删除个数
6.reverse() 颠倒交换
7.sort() 排序
    arr.sort(function (a, b) {
        //升序
        return a - b;
        //降序
        return b - a;
    })

indexOf(查找的元素，开始查找的位置)

forEach() 遍历数组
    arr.forEach(function (value, index) {
        //value: 数组的元素
        //index: 数组的元素下标
    })

关联数组:哈希(hash)数组 关联数组的length失效
var hash = [];

## 字符串API

`任何字符串API都无法修改原字符串`

1. charCodeAt()  将字符串转化为unicode, 只能转换一个字符

2. fromCharCode()将unicode转换为普通字符

3. slice(m[, n])  类似数组的slice

4. chatAt(下标) 或者 [下标] 获取字符串的一个字符

5. indexOf(查找的字符[, 开始查找下标]), 在开头开始查找字符, 找到返回下标  没有找到返回-1

6. lastIndexOf(查找的字符[, 开始查找下标]) 在末尾开始查找字符  从后往前找 找到返回匹配第一个字符的下标 找不到返回-1

7. substr(m[, n]) m: 开始截取下标, 截取字符个数,用法类似数组的splice
   //n如果不传递,则默认从下标m开始截取剩余的所有字符

8. substring(m[, n]) 用法类似slice, slice可以支持负数下标, substring不支持负数下标

9. toUpperCase()  大写字符转
10. toLowerCase() 小写字符转
11. trim() 去除字符串左右空格
12. 查找字符串是否含有某个字符，找到返回true,找不到返回false
    includes(char, index): char: 被查找的字符， index: 从index开始查找
13. 查找字符串是否在开头含有某个字符，找到返回true,找不到返回false
    startsWith(char, index) char: 被查找的字符，index: 从index开始查找
14. 查找字符串是否在末尾含有某个字符，找到返回true,找不到返回false
    endsWith(char, n): char: 被查找的字符，n: 前n个字符

[点击查看例子](https://jsbin.com/xevubuh/edit?html,console)

## vue路由传参

如果router-link to值为没有斜杠的字符串则路由会跳转到'根路径+to值’

？后面的参数我们称他为query

可以使用location对象的形式向跳转传递query对象

```
:to="{path:'link/to',query:{name:'老李',age:44}}"
```

> 注意  如果要用location对象跳转路由并传递params对象，不能使用path跳转  只能使用name
> 还可以用location对象的形式向跳转的路由传递params

```
:to="{name:'linkto',params:{name:'老李'，age:44}}"
```

to  路由跳转属性 string | Location
replace  路由的跳转将使用替换 而不是path
replace的值是一个布尔值Boolean  不写默认为true

append  如果append值为真并且link to的path不以斜杠开头，路由将会基于当前路径拼接后跳转，而不是直接跳转至根路径

tag   router-link默认会被渲染成a标签，tag标签指定router-link最终以什么标签渲染在页面中

active-class 设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置

exact-active-class

exact  类型boolean  让active-class严格匹配

event  默认值click   使用什么事件来触发路由的导航  可以是字符串或者数组
例如 event:'dblclick'  双击跳转

methods: {
    //路由的跳转
    this.$router.push("link")

}

router.go(n)  基于当前浏览器窗口history栈  后退前进多少步
router.back()  后退到前一个路由  等价于go(-1)
router.forward()  前进到下一个路由  等价于go(1)


## css隐藏元素的方法及区别

### 1.opacity

opacity:0将元素本身及其子元素都置为不可见的，而元素本身依然占据它自己的位置并对网页的布局起作用，它会响应用户交互

### 2 .visibility

visibility:hidden将元素本身及其子元素都置为不可见的, 而元素本身依然占据它自己的位置并对网页的布局起作用，它不会响应用户交互.如果想让子元素显示，则设置子元素的visibility：visible;

### 3.display

display:none使用这个属性，被隐藏的元素对网页的布局不起作用。不仅如此，一旦display设为none任何对该元素直接的用户交互操作都不可能生效。此外，读屏软件也不会读到元素的内容。这种方式产生的效果就像元素完全不存在。通过DOM依然可以访问到这个元素。因此你可以通过DOM来操作它。

### 4.position

position:absolute 将top和left设置成足够大的负数，相当于把元素放到可视区域外，它不会影响布局，能够让元素保持可操作性，在读屏软件上可以被识别。

**总结一下**：

opacity,visibility影响布局，前者不影响交互，后者影响交互；

display不影响布局，影响交互；

position 不影响布局，不影响交互；



## 多行文本溢出截断且以省略号方式显示
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;



## JS元素node节点API

```JS
// 创建一个新元素
document.createElement()

// 将新元素添加到html中
父元素.appendChild()

// 移除节点
元素.remove()   //删除自身

// 移除子节点
父元素.removeChild()

// 替换子节点
父元素.replaceChild(新节点 ， 旧节点)

// 在节点前添加节点
父元素.insertBefore(新节点 , 旧节点)

// 获取样式
getComputedStyle(元素)

// 设置样式
元素.style.css样式属性 = css样式属性值

// 鼠标进入
onmouseenter / onmouseover

// 鼠标移动
onmousemove

// 鼠标离开
onmouseleave / onmouseout

// 鼠标按下时
onmousedown

// 鼠标松开时
onmouseup

// 设置属性
元素.SetAttribute(属性名称, 属性值)

// 获取属性
元素.getAttribute(属性名称)

// 移除属性
元素.removeAttribute(属性名称);

```



## 为什么使用严格模式:

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;  

-  消除代码运行的一些不安全之处，保证代码运行的安全；  
-  提高编译器效率，增加运行速度；  
-  为未来新版本的Javascript做好铺垫。 

 

`严格模式`体现了Javascript更合理、更安全、更严谨的发展方向，包括IE 10在内的主流浏览器，都已经支持它，许多大项目已经开始全面拥抱它。 

 另一方面，同样的代码，在`严格模式`中，可能会有不一样的运行结果；一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。掌握这些内容，有助于更细致深入地理解Javascript，让你变成一个更好的程序员

 

### 严格模式影响范围

- 变量：  var、delete、变量关键字
- 对象： 只读属性、 对象字面量属性重复申明
- 函数：参数重名、arguments对象、申明
- 其他：this、eval、关键字...



## constructor属性

constructor返回javascript中所有变量的构造函数

```js
"John".constructor                 // 返回函数 String()  { [native code] }
(3.14).constructor                 // 返回函数 Number()  { [native code] }
false.constructor                  // 返回函数 Boolean() { [native code] }
[1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
new Date().constructor             // 返回函数 Date()    { [native code] }
function () {}.constructor         // 返回函数 Function(){ [native code] }

native code	本地代码，指已编写好的代码
```



## 对象的三大状态

- 防扩展
- 密封
- 冻结



### 对象防扩展

> 不能添加属性，可以修改，删除

```js
Object.preventExtensions(对象);

// 判断对象是否可扩展，防扩展返回false，可扩展返回true
Object.isExtensible(对象); 
```



### 密封

> 不能添加，删除，可修改

```js
Object.seal(对象)

// 判断是否密封
Object.isSealed(对象)
```



### 冻结

> 不能添加，不能删除，不能修改

```js
Object.freeze(对象)
// 判断是否被冻结
Object.isFrozen(对象)	
```



### Object.defineProperty

> 添加对象属性

```js
// Object.defineProperty(原对象, 键名, 键名的配置)

Object.defineProperty(person, 'weight', {
	value: '80kg',
	writable: false, //是否可写, 默认为false
	enumerable: false, //是否能被遍历, 默认为false
	configurable: false, //是否可删除, 默认为false
})
```



### Object.defineProperties

>  添加多个对象属性

```js
// Object.defineProperties(原对象, {键名配置1, 键名配置2, ...})

Object.defineProperties(person, {
	//game作为person的属性
	game: {
		value: '节奏大师'
	},
	otherGame: {
		value: '天天酷跑',
		writable: true,
		enumerable: false,
		configurable: false
	}
})
```



### Object.propertyIsEnumerable(属性)

> 判断对象属性是否可枚举

```js
var info = {
    name: 'xiaoming',
    age: 18
}

Object.defineProperty(info, 'sex', {
    value: "男",
    enumerable: false
})

info.propertyIsEnumerable('name'); // true
info.propertyIsEnumerable('age');  // true
info.propertyIsEnumerable('sex');  // false
```



### Object.setPrototypeOf

> 设置对象的原型

```js
Object.setPrototypeOf(被设置的对象，被设置对象的原型对象)
```



### Object.getPrototypeOf

> 获取原型对象

```js
Object.getPrototypeOf(需要获取原型的对象)
```



### Object.isPrototypeOf()

> 判断某个对象是否为对象的原型

```js
被判断的原型对象.isPrototypeOf(被判断的对象)
```



## 判断数组的六种方法

```js
Array.isArray(arr)

arr.constructor === Array

Array.Prototype.isPrototypeOf(arr)

arr instanceof Array

Object.getPrototypeOf(arr) === Array.prototye

Object.prototype.toString.call(arr) === '[object Array]'
```



## ES5 继承

```js
Child.prototype = Pratent
//修改Child的构造器回Child
Child.prototype.constructor = Child;
```



## 获取数组对象的键名

```js
// 获取所有非symbol类型的可枚举的键
Object.keys(o);					
// 获取所有非symbol类型的所有键
Object.getOwnPropertyNames（o);		
// 获取所有symbol类型的键
Object.getOwnPropertySymbols(o)	
```



## 判断对象和数组是否相等

```js
Object.is([], []) // false
```



## 类数组对象转化成数组对象

```JS
let o = {
	0: 1,
	1: 2,
	2: "hello",
	length: 3
}

// ES5
var a1 = Array.prototype.slice.call(o)
var a1 = [].slice.call(o);

// ES6
let a2 = Array.from(o);
```



## 将一组值转换成数组 

```js
// ES5
var arr = new Array(3) //表示创建length为3的数组
var arr = new Array(3, 8) //表示创建length为2，分别为3，8的数组

// ES6
var arr = Array.of(3) //表示创建length为1，值为3的数组
```



## 判断对象是否有某属性

```js
//es5
console.log("color" in tiger);
			
// ES6 自身属性或原型属性
let ishas = Reflect.has(tiger,"color")
```



## Vue

### vue结构

> <link rel="stylesheet" href="<%=base_url%>css/resetcss.css">
>
> src文件夹内的任何文件通过相对路径只能访问src目录下的文件，如果想在模板中引入public目录文件，需要process.env.BASE_URL定位到public目录

```js
	node_modules: 第三方模块
	public: 静态文件目录
	src: 开发目录
		asset: 静态文件目录
		components: 公共组件目录
		router: 路由配置目录
		views: 路由组件
	views: 路由配置的组件
	App.vue: 根组件
	main.js: 入口文件
	package.json
```



### main.js

```js
// 导入vue文件
import Vue from 'vue'

// 导入App组件
import App from './App.vue'

// 导入路由配置
import router from './router'

// vue关闭生产环境的提示(警告信息，错误信息，打印信息)
Vue.config.productionTip = false

// vue实例化
new Vue({
  // 自动启动vue编译范围
  // el: '#app'

  // 路由配置
  router,
  
  // 渲染根组件
  render: h => h(App)
}).$mount('#app')// 手动启动vue编辑范围
```



### 路由跳转的三种方式

```js
1.router-link
2.this.$router.push({path: '/user'})
	常用于路由传参，用法同第三种
	区别:
	query引入方式
	params只能用name来引入路由
	而query要用path引入
	
	query传递方式
	类似于我们ajax中get传参，在浏览器地址中显示参数
	params则类似于post，在浏览器地址中不显示参数 接受参数需要解耦

3.this.$router.replace{path: '/'}类似
```



### 路由传参

可以使用location对象的形式向跳转传递query对象

:to="{path:'link/to',query:{name:'老李',age:44}}"


注意  如果要用location对象跳转路由并传递params对象，不能使用path跳转  只能使用name
还可以用location对象的形式向跳转的路由传递params

:to="{name:'linkto',params:{name:'老李'，age:44}}"

to  路由跳转属性 string | Location
replace  路由的跳转将使用替换 而不是path
replace的值是一个布尔值Boolean  不写默认为true

append  如果append值为真并且link to的path不以斜杠开头，路由将会基于当前路径拼接后跳转，而不是直接跳转至根路径

tag   router-link默认会被渲染成a标签，tag标签指定router-link最终以什么标签渲染在页面中

active-class 设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置

exact-active-class

exact  类型boolean  让active-class严格匹配

event  默认值click   使用什么事件来触发路由的导航  可以是字符串或者数组
例如 event:'dblclick'  双击跳转


methods: {
    //路由的跳转
    this.$router.push("link")

}

router.go(n)  基于当前浏览器窗口history栈  后退前进多少步
router.back()  后退到前一个路由  等价于go(-1)
router.forward()  前进到下一个路由  等价于go(1)



### 谈谈你对生命周期的理解

**生命周期是什么？**

```
Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是Vue的生命周期
```

**各个生命周期的作用**

|   生命周期    | 描述                                                         |
| :-----------: | ------------------------------------------------------------ |
| beforeCreate  | 组件实例被创建之初，组件的属性生效之前                       |
|    created    | 组件实例已经完全创建，属性也绑定，但真实dom还没有生成，$el还不可用 |
|  beforeMount  | 在挂载开始之前被调用: 相关的render函数首次被调用             |
|    mounted    | el被新创建的vm.$el替换,并挂载到实例上去之后调用该钩子        |
| beforeUpdate  | 组件数据更新之前调用，发生在虚拟DOM打补丁之前                |
|   activited   | keep-alive专属，组件被激活时调用                             |
| deadctivated  | keep-alive专属，组件被销毁时调用                             |
|    updated    | 组件数据更新之后                                             |
| beforeDestory | 组件销毁前调用                                               |
|   destroyed   | 组件销毁之后调用                                             |



### 跨域与本地服务器API设置

> 本地服务器API接口的设置:
>
> 需要在项目根目录中创建vue.config.js文件(修改配置vue-cli自身webpack配置文件)
>
> 代码详见 项目中 vue.config.js

```js
// 这里是node的js语法,文件的引入不能使用es6 import
// 只能使用common.js  require
// 获取本地json文件
var data = require('./data.json')
var seller = data.seller
var goods = data.goods
var ratings = data.ratings
// 将需要修改webpack配置的对象通过module.exports公开出去
// TODO:如果真实开发请让你的api与公司的api保持一致,项目完成后打包上架时,不会打包此处的代码! 你项目中网络请求与公司提供的api不一致导致无法请求数据

module.exports = {
    devServer: {
        before(app) {
            // 在服务器开始创建时声明当前本地服务
            // app代表服务器,get当前api为get请求,
            app.get('/ele/seller', function (req, res) {
                res.json({data: seller});
            });
            app.get('/ele/goods', function (req, res) {
                res.json({data: goods});
                // res.json 后台向前端返回json数据
            });
            app.get('/ele/ratings', function (req, res) {
                res.json({data: ratings});
            });
        },
        // 跨域api代理设置,TODO:跨域代理同样不会被打包到上架项目中,所以跨域api与真实服务保持一致

        proxy: {
            "/api": { // 当项目向/api开头的路径发送请求都会通过服务器代理访问target网站
                target: "http://capi.douyucdn.cn", // 代理跳转的目标网站
                changeOrigin: true, // 代理跳转至指定的host
                // 当你要 http://capi.douyucdn.cn/api/v1/live?limit=20&offset=0
                // 只需要访问 /api/v1/live?limit=20&offset=0
            },
            // http://v2.api.dmzj.com/recommend.json
            "/dmzj": {
                target: "http://v2.api.dmzj.com",
                changeOrigin: true,
                // 路径重写之前请求 "/dmzj/recommend.json" => http://v2.api.dmzj.com/dmzj/recommend.json
                pathRewrite: { // 路径重写
                    '^/dmzj': '', // rewrite path
                    // 路径重写之后 /api 被替换成了空字符 请求 "/dmzj/recommend.json" => http://v2.api.dmzj.com/recommend.json
                }
            }
        }
    }
}
```



### vue的网络请求

vue中不使用jquery做网络请求,jquery很大三方库为了单纯的使用ajax而引入一个很大的库是不必要的

在vue中推荐使用axios库做ajax网络请求或者使用H5新提供的网络请求API Fetch

首先在项目中安装axios

```shell
$ npm i -S axios
```

```js
# main.js
import  VueAxios from 'vue-axios'
import  axios from 'axios'

Vue.config.productionTip = false
// 给vue添加axios的原型对象
// Vue.prototype.$http = axios
// axios本身不支持Vue.use方法,安装三方库 vue-axios $ npm i -S vue-axios
Vue.use(VueAxios,axios) // 这样vue实例中,多了两个原型方法 .$http  .axios 都是axios
```

