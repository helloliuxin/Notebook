# Nginx学习笔记

![Nginx](/images/nginx/nginx.png)

本文所介绍的环境是：

操作系统：CentOS7

环境：阿里云服务器



## 1. Nginx是什么

> “Nginx 是一款轻量级的 HTTP 服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的 IO 性能，时常用于服务端的**反向代理**和**负载均衡**。”

这是大多数开发者对 Nginx 的定义。

Nginx 是一款 http 服务器 （或叫web服务器）。它是由俄罗斯人 伊戈尔·赛索耶夫为俄罗斯访问量第二的 Rambler.ru 站点开发的，并于2004年首次公开发布的。

> web服务器：负责处理和响应用户请求，一般也称为http服务器，如 Apache、IIS、Nginx
>
> 应用服务器：存放和运行系统程序的服务器，负责处理程序中的业务逻辑，如 Tomcat、Weblogic、Jboss（现在大多数应用服务器也包含了web服务器的功能）

Nginx 是什么，总结一下就是这些：

- 一种轻量级的web服务器
- 设计思想是事件驱动的异步非阻塞处理（类node.js）
- 占用内存少、启动速度快、并发能力强
- 使用C语言开发
- 扩展性好，第三方插件非常多
- 在互联网项目中广泛应用



## 2. Nginx的优势及主要应用场景

传统的 Web 服务器，每个客户端连接作为一个单独的进程或线程处理，需在切换任务时将 CPU 切换到新的任务并创建一个新的运行时上下文，消耗额外的内存和 CPU 时间，当并发请求增加时，服务器响应变慢，从而对性能产生负面影响。

Nginx 是开源、高性能、高可靠的 Web 和反向代理服务器，而且支持热部署，几乎可以做到 7 * 24 小时不间断运行，即使运行几个月也不需要重新启动，还能在不间断服务的情况下对软件版本进行热更新。性能是 Nginx 最重要的考量，其占用内存少、并发能力强、能支持高达 5w 个并发连接数，最重要的是，Nginx 是免费的并可以商业化，配置使用也比较简单。



总结一下优势及主要应用场景如下：

### Nginx优势

- 高并发高性能
- 可扩展性好
- 高可靠性
- 热部署
- 开源许可证



### Nginx主要应用场景

- 静态资源服务，通过本地文件系统提供服务
- 反向代理服务、负载均衡
- API服务、权限控制，减少应用服务器压力



## 3. Nginx安装

### 方法1：源码编译安装

**准备安装环境**

首先由于nginx的一些模块依赖一些lib库，所以在安装nginx之前，必须先安装这些lib库，这些依赖库主要有g++、gcc、openssl-devel、pcre-devel和zlib-devel 所以执行如下命令安装

```shell
# 一条命令的写法
$ yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel

# 安装gcc 主要用来进行编译相关使用
$ yum install gcc-c++

# 安装prce
# PCRE(Perl Compatible Regular Expressions)是一个Perl库，包括 perl 兼容的正则表达式库。nginx的http模块使用pcre来解析正则表达式，所以需要在linux上安装pcre库。
# 注：pcre-devel是使用pcre开发的一个二次开发库，nginx也需要此库。
$ yum install -y pcre pcre-devel

# 安装zlib 
# zlib库提供了很多种压缩和解压缩的方式，nginx使用zlib对http包的内容进行gzip，所以需要在linux上安装zlib库。
$ yum install -y zlib zlib-devel

# 安装openssl
# OpenSSL 是一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及SSL协议，并提供丰富的应用程序供测试或其它目的使用。
# nginx不仅支持http协议，还支持https（即在ssl协议上传输http），所以需要在linux安装openssl库。
$ yum install -y openssl openssl-devel
```

**下载并解压安装包**

nginx源码文件下载：https://nginx.org/en/download.html

```shell
# 下载指定版本的nginx源码包
$ wget http://nginx.org/download/nginx-1.16.1.tar.gz

# 解压
$ tar xzvf nginx-1.16.1.tar.gz
$ cd nginx-1.16.1
```

**配置、编译及安装**

```shell
# 进入到压缩后的目录执行配置
$ cd nginx-1.16.1
# 简单点直接执行命令 ./configure 默认安装在/usr/local/nginx   下面显示的自定义配置
$ ./configure \
  --prefix=/usr/local/nginx \ # --prefix指定安装目录
  --pid-path=/var/run/nginx/nginx.pid \
  --lock-path=/var/lock/nginx.lock \
  --error-log-path=/var/log/nginx/error.log \
  --http-log-path=/var/log/nginx/access.log \
  --with-http_gzip_static_module \
  --http-client-body-temp-path=/var/temp/nginx/client \
  --http-proxy-temp-path=/var/temp/nginx/proxy \
  --http-fastcgi-temp-path=/var/temp/nginx/fastcgi \
  --http-uwsgi-temp-path=/var/temp/nginx/uwsgi \
  --http-scgi-temp-path=/var/temp/nginx/scgi
$ make
$ make install
```

**启动测试**

执行上述编译安装之后，nginx将会被安装到目录“/usr/local/nginx”下。

```shell
$ cd /usr/local/nginx/sbin
$ ./nginx -t
```

出现如下配置表示配置正常

> nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
> nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful

**启动**

```shell
[root@izuf6ihx8oxf0mdpwm2keez sbin]# ./nginx
```



### 方法2： 通过包管理器yum安装

> yum安装rpm包会比编译安装简单很多，默认会安装许多模块，但缺点是如果你想以后安装第三方模块那就没办法了

**快速安装**

```shell
# 默认情况Centos7中无Nginx的源，最近发现Nginx官网提供了Centos的源地址。因此可以如下执行命令添加源：
$ sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

# 先看看列出所有可安裝的软件清单命令，管道过滤出nginx的相关内容
$ yum list | grep nginx
$ yum install nginx
# 安装完Nginx，然后我们在命令行中 nginx -v 就可以看到具体的 Nginx 版本信息，也就安装完毕了。
[root@iZwz9e29n48oxxxxxx /]# nginx -v
nginx version: nginx/1.16.1
```



### 查看Nginx是否安装成功

可以通过以下命令查看Nginx是否已经安装、或者是否已经启动，实时更新其他方法

1. 查看进程列表

   > Linux每个应用运行都会产生一个进程，那么我们就可以通过查看Nginx进程是否存在来判断它是否启动。

   用**ps -ef**列出进程列表，然后通过**grep**过滤

   ```shell
   [root@izuf6ihx8oxxxxxxxxx ~]# ps -ef | grep nginx
   显示结果：
   root      9587  9322  0 01:19 pts/0    00:00:00 grep --color=auto nginx
   root     13059     1  0 Dec09 ?        00:00:00 nginx: master process ./nginx
   nobody   13060 13059  0 Dec09 ?        00:00:00 nginx: worker process
   ```

   

2. 查看Nginx的进程id

   ```shell
   [root@izuf6ihx8oxxxxxxxxx ~]# ps -C nginx -o pid
   显示结果：
     PID
   13059
   13060
   ```

   

## 4. Nginx卸载

### (1) 卸载用yum方式安装的nginx

> 卸载用yum方式安装的nginx，卸载前先备份好nginx.conf

1. 先停止nginx

   ```shell
   $ service nginx stop
   ```

2. 关闭自动启动

   ```shell
   $ chkconfig nginx off
   ```

3. 输入find / -name nginx*指令全局查找nginx相关的文件：

   ```shell
   $ find / -name nginx* # 改命令在根目录执行
   ```

4. 删除相关文件,使用rm -rf file /usr/local/nginx* 对相关文件进行删除

   ```shell
   $ rm -rf /usr/sbin/nginx
   $ rm -rf /etc/nginx
   $ rm -rf /etc/init.d/nginx
   ```

5. 卸载

   ```shell
   $ yum remove nginx
   ```

6. 检查是否还有残余文件，有的话执行步骤3继续删除

   ```shell
   $ whereis nginx
   ```




### (2) 卸载用源码编译安装的nginx

> 编译安装的nginx卸载非常方便，直接将nginx的安装目录“/usr/local/nginx”删除即可，同时可以把nginx使用的日志目录和临时目录一并删除。

删除编译安装的nginx

```shell
$ rm -rf /usr/local/nginx
$ rm -rf /var/log/nginx
$ rm -rf /var/temp/nginx
```



## 5. Nginx常用命令

1. 找到nginx.conf(配置文件)

   在不同的系统下 nginx.conf 的位置可能不太一样，使用搜索可以很容易找到它：

   ```shell
   $ find / -name nginx.conf
   ```

   意思是从根目录开始搜索 nginx.conf 文件的位置。在 CentOS 7 (yum安装的默认情况)里，这个文件是在：

   ```shell
   # 输出结果
   /etc/nginx/nginx.conf
   ```

   打开 /etc/nginx ，在这个目录下面，会包含一些其它的文件， .default 结尾的文件应该是原文件的备份，比如 nginx.conf 是真正用的配置文件，nginx.conf.default 是这个文件的一个备份，如果 nginx.conf 出了问题，你可以把 nginx.conf.default 重命名为 nginx.conf 代替原来的文件。

   

2. nginx基本操作命令

   **a. 源码编译安装情况**

   > 进入到nginx安装目录的sbin文件夹下执行

   注意，一定要写成 **./nginx**，而不是 **nginx**，运行其它二进制的程序也一样，直接写 nginx，linux 系统会去 PATH 里寻找有没有叫 nginx 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 nginx是会找不到命令的，要用 ./nginx告诉系统说，就在当前目录找。

   ```shell
   $ cd /usr/local/nginx/sbin
   
   # 查看版本
   $ ./nginx -v
   
   # 检查配置文件是否正确
   $ ./nginx -t
   
   # 启动
   $ ./nginx
   
   # 关闭（有两种方式，推荐使用./nginx -s quit）
   $ ./nginx -s stop
   或
   $ ./nginx -s quit
   
   # 重新加载nginx配置
   $ ./nginx -s reload
   ```

   **b. 使用yum包管理器安装情况**

   Nginx 的命令在控制台中输入 `nginx -h` 就可以看到完整的命令，这里列举几个常用的命令：

   ```shell
   $ nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启
   $ nginx -s reopen	 # 重启 Nginx
   $ nginx -s stop    # 快速关闭
   $ nginx -s quit    # 等待工作进程处理完成后关闭
   $ nginx -T         # 查看当前 Nginx 最终的配置
   $ nginx -t -c <配置路径>    # 检查配置是否有问题，如果已经在配置目录，则不需要-c
   ```

   `systemctl` 是 Linux 系统应用管理工具 `systemd` 的主命令，用于管理系统，我们也可以用它来对 Nginx 进行管理，相关命令如下：

   ```shell
   $ systemctl start nginx    # 启动 Nginx
   $ systemctl stop nginx     # 停止 Nginx
   $ systemctl restart nginx  # 重启 Nginx
   $ systemctl reload nginx   # 重新加载 Nginx，用于修改配置后
   $ systemctl enable nginx   # 设置开机启动 Nginx
   $ systemctl disable nginx  # 关闭开机启动 Nginx
   $ systemctl status nginx   # 查看 Nginx 运行状态
   ```

   

## 6. Nginx的配置语法

### 1）nginx.conf结构图

`nginx.conf` 结构图可以这样概括：

```markdown
main        # 全局配置，对全局生效
├── events  # 配置影响 Nginx 服务器或与用户的网络连接
├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│   ├── server
│   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...
```

配置文件分三部分组成

**全局块**
从配置文件开始到events块之间，主要是设置一些影响nginx服务器整体运行的配置指令

并发处理服务的配置，值越大，可以支持的并发处理量越多，但是会受到硬件、软件等设备的制约

**events块**
影响nginx服务器与用户的网络连接，常用的设置包括是否开启对多workprocess下的网络连接进行序列化，是否允许同时接收多个网络连接等等

支持的最大连接数

**http块**

与提供http服务相关的一些配置参数。例如：是否使用keepalive啊，是否使用gzip进行压缩等。

诸如反向代理和负载均衡都在此配置

- server虚拟主机

  http服务上支持若干虚拟主机。每个虚拟主机一个对应的server配置项，配置项里面包含该虚拟主机相关的配置。每个server通过监听地址或端口来区分。

- location

  http服务中，某些特定的URL对应的一系列配置项



### 2）配置文件语法

一个 Nginx 配置文件的结构就像 `nginx.conf` 显示的那样，配置文件的语法规则：

1. 配置文件由指令与指令块构成；
2. 每条指令以 `;` 分号结尾，指令与参数间以空格符号分隔；
3. 指令块以 `{}` 大括号将多条指令组织在一起；
4. `include` 语句允许组合多个配置文件以提升可维护性；
5. 使用 `#` 符号添加注释，提高可读性；
6. 使用 `$` 符号使用变量；
7. 部分指令的参数支持正则表达式；



### 3）典型配置

nginx 是由一些模块组成的，不同的模块定义了各自的一些指令（Directives），指令控制了模块的行为，在 nginx 的配置文件里可以去配置这些指令。主要的配置文件是 nginx.conf ，在这个配置文件里，会用到 include 指令，把其它地方的配置文件包含到这个主要的配置文件里，用这种方法可以让配置文件更有条理，也更容易维护。

配置文件分三部分组成



Nginx的典型配置：

```nginx
user  nginx;                        # 运行用户，默认即是nginx，可以不进行设置
worker_processes  auto;                # Nginx 进程数，建议按cpu核心数量限制或者auto
error_log  /var/log/nginx/error.log warn;   # Nginx 的错误日志存放目录
pid        /var/run/nginx.pid;      # Nginx 服务启动时的 pid 存放位置

events {
    use epoll;     # 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
    multi_accept on; #接受尽可能多的连接。
    worker_connections 1024;   # 每个进程允许最大并发数
}

http {   # 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置
    # 设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;   # Nginx访问日志存放位置

    sendfile            on;   # 开启高效传输模式
    tcp_nopush          on;   # 减少网络报文段的数量
    tcp_nodelay         on;
    keepalive_timeout   65;   # 保持连接的时间，也叫超时时间，单位秒
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;      # 文件扩展名与类型映射表
    default_type        application/octet-stream;   # 默认文件类型

    include /etc/nginx/conf.d/*.conf;   # 加载子配置项
    
    # 当nginx接到请求后，会匹配其配置中的service模块
    # 匹配方法就是将请求携带的host和port去跟配置中的server_name和listen相匹配
    server {
    	listen       80;       # 配置监听的端口
    	server_name  localhost;    # 配置的域名
    	
    	location / {
    		root   /usr/share/nginx/html;  # 网站根目录
    		index  index.html index.htm;   # 默认首页文件
    		deny 172.168.22.11;   # 禁止访问的ip地址，可以为all
    		allow 172.168.33.44； # 允许访问的ip地址，可以为all
    	}
    	
    	error_page 500 502 503 504 /50x.html;  # 默认50x对应的访问页面
    	error_page 400 404 error.html;   # 同上
    }
}
```

server{ } 其实是包含在 http{ } 内部的。每一个 server{ } 是一个虚拟主机（站点）。

上面代码块的意思是：当一个请求叫做`localhost:8080`请求nginx服务器时，该请求就会被匹配进该代码块的 server{ } 中执行。

server 块可以包含多个 location 块，location 指令用于匹配 uri，语法：

```nginx
location [ = | ~ | ~* | ^~] uri {
	...
}
```

指令后面：

1. `=` 精确匹配路径，用于不含正则表达式的 uri 前，如果匹配成功，不再进行后续的查找；
2. `^~` 用于不含正则表达式的 uri； 前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找；
3. `~` 表示用该符号后面的正则去匹配路径，区分大小写；
4. `~*` 表示用该符号后面的正则去匹配路径，不区分大小写。跟 `~` 优先级都比较低，如有多个location的正则能匹配的话，则使用正则表达式最长的那个；

如果 uri 包含正则表达式，则必须要有 `~` 或 `~*` 标志。



当然 nginx 的配置非常多，用的时候可以根据文档进行配置。

> 英文文档：http://nginx.org/en/docs/
>
> 中文文档：https://www.nginx.cn/doc/



### 4) 全局变量

Nginx 有一些常用的全局变量，你可以在配置的任何位置使用它们，如下表：

| 全局变量名         | 功能                                                         |
| ------------------ | ------------------------------------------------------------ |
| `$host`            | 请求信息中的 `Host`，如果请求中没有 `Host` 行，则等于设置的服务器名，不包含端口 |
| `$request_method`  | 客户端请求类型，如 `GET`、`POST`                             |
| `$remote_addr`     | 客户端的 `IP` 地址                                           |
| `$args`            | 请求中的参数                                                 |
| `$arg_PARAMETER`   | `GET` 请求中变量名 PARAMETER 参数的值，例如：`$http_user_agent`(Uaer-Agent 值), `$http_referer`... |
| `$content_length`  | 请求头中的 `Content-length` 字段                             |
| `$http_user_agent` | 客户端agent信息                                              |
| `$http_cookie`     | 客户端cookie信息                                             |
| `$remote_addr`     | 客户端的IP地址                                               |
| `$remote_port`     | 客户端的端口                                                 |
| `$http_user_agent` | 客户端agent信息                                              |
| `$server_protocol` | 请求使用的协议，如 `HTTP/1.0`、`HTTP/1.1`                    |
| `$server_addr`     | 服务器地址                                                   |
| `$server_name`     | 服务器名称                                                   |
| `$server_port`     | 服务器的端口号                                               |
| `$scheme`          | HTTP 方法（如http，https）                                   |

还有更多的内置预定义变量，可以直接搜索关键字「nginx内置预定义变量」可以看到一堆博客写这个，这些变量都可以在配置文件中直接使用。



## 7. 正向代理

**一句话解释正向代理，正向代理的对象是客户端，服务器端看不到真正的客户端。** 

![img](/images/nginx/forwardproxy.jpg)

一般的访问流程是客户端直接向目标服务器发送请求并获取内容，使用正向代理后，客户端改为向代理服务器发送请求，并指定目标服务器（原始服务器），然后由代理服务器和原始服务器通信，转交请求并获得的内容，再返回给客户端。正向代理隐藏了真实的客户端，为客户端收发请求，使真实客户端对服务器不可见；



**正向代理:客户端 <一> 代理 一>服务端**

正向代理简单地打个租房的比方:

A(客户端)想租C(服务端)的房子,但是A(客户端)并不认识C(服务端)租不到。
B(代理)认识C(服务端)能租这个房子所以你找了B(代理)帮忙租到了这个房子。

这个过程中C(服务端)不认识A(客户端)只认识B(代理)
C(服务端)并不知道A(客户端)租了房子，只知道房子租给了B(代理)。



举个具体的例子 🌰，你的浏览器无法直接访问谷哥，这时候可以通过一个代理服务器来帮助你访问谷哥，那么这个服务器就叫正向代理。



## 8. 反向代理

**一句话解释反向代理，反向代理的对象是服务端，客户端看不到真正的服务端。**

![img](/images/nginx/reverseproxy.jpg)

与一般访问流程相比，使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到的结果返回给客户端。反向代理隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见。一般在处理跨域请求的时候比较常用。现在基本上所有的大型网站都设置了反向代理。



**反向代理:客户端 一>代理 <一> 服务端**

反向代理也用一个租房的例子:

A(客户端)想租一个房子,B(代理)就把这个房子租给了他。
这时候实际上C(服务端)才是房东。
B(代理)是中介把这个房子租给了A(客户端)。

这个过程中A(客户端)并不知道这个房子到底谁才是房东
他都有可能认为这个房子就是B(代理)的

由上的例子和图我们可以知道正向代理和反向代理的区别在于代理的对象不一样,正向代理的代理对象是客户端,反向代理的代理对象是服务端。



举个具体的例子 🌰，去饭店吃饭，可以点川菜、粤菜、江浙菜，饭店也分别有三个菜系的厨师 👨‍🍳，但是你作为顾客不用管哪个厨师给你做的菜，只用点菜即可，小二将你菜单中的菜分配给不同的厨师来具体处理，那么这个小二就是反向代理服务器。



**反向代理的作用**

1. 保障应用服务器的安全（增加一层代理，可以屏蔽危险攻击，更方便的控制权限）
2. 实现负载均衡（稍等~下面会讲）
3. 实现跨域（号称是最简单的跨域方式）



**简单的说，一般给客户端做代理的都是正向代理，给服务器做代理的就是反向代理。**



### 反向代理例子

```nginx
# 例子1：
# 访问blog.helloliuxin.cn跳转到http://101.132.75.97:9999
location / {
    	root html;
    	proxy_pass http://101.132.75.97:9999;
    	index index.html index.htm;
    }

# 例子2：
location /edu/ {
    	root html;
    	proxy_pass http://101.132.75.97:9999;
    }
    location /vod/ {
    	root html;
    	proxy_pass http://101.132.75.97:9998;
    }
```





## 9. 负载均衡

### 负载均衡是什么？

随着业务的不断增长和用户的不断增多，一台服务已经满足不了系统要求了。这个时候就出现了服务器 [集群](https://www.cnblogs.com/bhlsheji/p/4026296.html)。

在服务器集群中，Nginx 可以将接收到的客户端请求“均匀地”（严格讲并不一定均匀，可以通过设置权重）分配到这个集群中所有的服务器上。这个就叫做**负载均衡**。

负载均衡的示意图如下：

![img](/images/nginx/fuzaijunheng.png)



### 负载均衡的作用

- 分摊服务器集群压力
- 保证客户端访问的稳定性

前面也提到了，负载均衡可以解决分摊服务器集群压力的问题。除此之外，Nginx还带有**健康检查**（服务器心跳检查）功能，会定期轮询向集群里的所有服务器发送健康检查请求，来检查集群中是否有服务器处于异常状态。

一旦发现某台服务器异常，那么在这以后代理进来的客户端请求都不会被发送到该服务器上（直健康检查发现该服务器已恢复正常），从而保证客户端访问的稳定性。




### 配置负载均衡

```nginx
# upstream 指定后端服务器地址
# weight 设置权重
# server 中会将 http://myserver 的请求转发到 upstream 池中
upstream myserver {
    # ip_hash;  # ip_hash 方式
    # fair;   # fair 方式
	server 101.132.75.97:9998 weight=1;;
	server 101.132.75.97:9999 weight=1;;
}
    
server {
    # 负载均衡
    location /edu/ {
    	proxy_pass http://myserver;
    	root html; # Nginx的默认值
    	index index.html index.htm;
    }
}
```

**后台服务器状态**

后端服务器支持以下的状态配置：

- down：当前服务器不参与负载均衡
- backup：当其他节点都无法使用时的备用服务器
- max_fails：允许请求失败的次数，若到达就会休眠
- fail_timeout：经过max_fails次失败后，服务器的暂停时间，默认为10s
- max_conns：限制每个服务器的最大接收连接数

```nginx
upstream myserver { 
    server 127.0.0.1:66 down; 
    server 127.0.0.1:77 backup; 
    server 127.0.0.1:88  max_fails=3 fail_timeout=10s; 
    server 127.0.0.1:99 max_conns=1000;
}
```

**分配方式**

Nginx 提供了好几种分配方式，默认为**轮询**，就是轮流来。有以下几种分配方式：

1. **轮询**，默认方式，每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务挂了，能自动剔除；
2. **weight**，权重分配，指定轮询几率，权重越高，在被访问的概率越大，用于后端服务器性能不均的情况；
3. **ip_hash**，每个请求按访问 IP 的 hash 结果分配，这样每个访客固定访问一个后端服务器，可以解决动态网页 session 共享问题。负载均衡每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的；
4. **fair**（第三方），按后端服务器的响应时间分配，响应时间短的优先分配，依赖第三方插件 nginx-upstream-fair，需要先安装；



实际项目中的负载均衡远比这个案例要更加复杂，但是万变不离其宗，都是根据这个理想模型衍生出来的。

受集群单台服务器内存等资源的限制，负载均衡集群的服务器也不能无限增多。但因其良好的容错机制，负载均衡成为了实现**高可用架构**中必不可少的一环。



## 10. 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面交给不同的服务器来解析，加快解析的速度，降低由单个服务器的压力

![动静分离](/images/nginx/dongjing.png)

一般来说，都需要将动态资源和静态资源分开，由于 Nginx 的高并发和静态资源缓存等特性，经常将静态资源部署在 Nginx 上。如果请求的是静态资源，直接到静态资源目录获取资源，如果是动态资源的请求，则利用反向代理的原理，把请求转发给对应后台应用去处理，从而实现动静分离。

使用前后端分离后，可以很大程度提升静态资源的访问速度，即使动态服务不可用，静态资源的访问也不会受到影响。

这样做不仅能给应用服务器减轻压力，将后台api接口服务化，还能将前后端代码分开并行开发和部署。（传送门：[nginx动静分离的好处](https://www.php.cn/nginx/424631.html)）

```nginx
server {  
        listen       8080;        
        server_name  localhost;

        location / {
            root   html; # Nginx默认值
            index  index.html index.htm;
        }
        
        # 静态化配置，所有静态请求都转发给 nginx 处理，存放目录为 my-project
        location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|js|css)$ {
            root /usr/local/var/www/my-project; # 静态请求所代理到的根目录
        }
        
        # 动态请求匹配到path为'node'的就转发到8002端口处理
        location /node/ {  
            proxy_pass http://localhost:8002; # 充当服务代理
        }
}
```



## 11. 跨域CORS配置

关于简单请求、非简单请求、跨域的概念，前面已经介绍过了，还不了解的可以看看前面的讲解。现在前后端分离的项目一统天下，经常本地起了前端服务，需要访问不同的后端地址，不可避免遇到跨域问题。

![image-20200427220536208](/images/nginx/kuayu.png)

要解决跨域问题，我们来制造一个跨域问题。首先和前面设置二级域名的方式一样，先设置好 `fe.sherlocked93.club` 和 `be.sherlocked93.club` 二级域名，都指向本云服务器地址，虽然对应 IP 是一样的，但是在 `fe.sherlocked93.club` 域名发出的请求访问 `be.sherlocked93.club` 域名的请求还是跨域了，因为访问的 host 不一致（如果不知道啥原因参见前面跨域的内容）



### 1) 使用反向代理解决跨域

在前端服务地址为 `fe.sherlocked93.club` 的页面请求 `be.sherlocked93.club` 的后端服务导致的跨域，可以这样配置：

```
server {
  listen 9001;
  server_name fe.sherlocked93.club;

  location / {
    proxy_pass be.sherlocked93.club;
  }
}
复制代码
```

这样就将对前一个域名 `fe.sherlocked93.club` 的请求全都代理到了 `be.sherlocked93.club`，前端的请求都被我们用服务器代理到了后端地址下，绕过了跨域。

这里对静态文件的请求和后端服务的请求都以 `fe.sherlocked93.club` 开始，不易区分，所以为了实现对后端服务请求的统一转发，通常我们会约定对后端服务的请求加上 `/apis/` 前缀或者其他的 path 来和对静态资源的请求加以区分，此时我们可以这样配置：

```nginx
# 请求跨域，约定代理后端服务请求path以/apis/开头
location ^~/apis/ {
    # 这里重写了请求，将正则匹配中的第一个分组的path拼接到真正的请求后面，并用break停止后续匹配
    rewrite ^/apis/(.*)$ /$1 break;
    proxy_pass be.sherlocked93.club;
  
    # 两个域名之间cookie的传递与回写
    proxy_cookie_domain be.sherlocked93.club fe.sherlocked93.club;
}
```

这样，静态资源我们使用 `fe.sherlocked93.club/xx.html`，动态资源我们使用 `fe.sherlocked93.club/apis/getAwo`，浏览器页面看起来仍然访问的前端服务器，绕过了浏览器的同源策略，毕竟我们看起来并没有跨域。

也可以统一一点，直接把前后端服务器地址直接都转发到另一个 `server.sherlocked93.club`，只通过在后面添加的 path 来区分请求的是静态资源还是后端服务，看需求了。



### 2) 配置header解决跨域

```nginx
server {
  listen       80;
  server_name  be.sherlocked93.club;
  
	add_header 'Access-Control-Allow-Origin' $http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
	add_header 'Access-Control-Allow-Credentials' 'true';    # 为 true 可带上 cookie
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';  # 允许请求方法
	add_header 'Access-Control-Allow-Headers' $http_access_control_request_headers;  # 允许请求的 header，可以为 *
	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
	
  if ($request_method = 'OPTIONS') {
		add_header 'Access-Control-Max-Age' 1728000;   # OPTIONS 请求的有效期，在有效期内不用发出另一条预检请求
		add_header 'Content-Type' 'text/plain; charset=utf-8';
		add_header 'Content-Length' 0;
    
		return 204;                  # 200 也可以
	}
  
	location / {
		root  /usr/share/nginx/html/be;
		index index.html;
	}
}
```





## 12. 开启gzip压缩

gzip 是一种常用的网页压缩技术，传输的网页经过 gzip 压缩之后大小通常可以变为原来的一半甚至更小（官网原话），更小的网页体积也就意味着带宽的节约和传输速度的提升，特别是对于访问量巨大大型网站来说，每一个静态资源体积的减小，都会带来可观的流量与带宽的节省。

百度可以找到很多检测站点来查看目标网页有没有开启 gzip 压缩，在下随便找了一个 [<网页GZIP压缩检测>](http://tool.chinaz.com/Gzips/Default.aspx?q=juejin.im) 输入掘金 `blog.helloliuxin.cn` 来偷窥下掘金有没有开启 gzip。



### 1) Nginx配置gzip

使用 gzip 不仅需要 Nginx 配置，浏览器端也需要配合，需要在请求消息头中包含 `Accept-Encoding: gzip`（IE5 之后所有的浏览器都支持了，是现代浏览器的默认设置）。一般在请求 html 和 css 等静态资源的时候，支持的浏览器在 request 请求静态资源的时候，会加上 `Accept-Encoding: gzip` 这个 header，表示自己支持 gzip 的压缩方式，Nginx 在拿到这个请求的时候，如果有相应配置，就会返回经过 gzip 压缩过的文件给浏览器，并在 response 相应的时候加上 `content-encoding: gzip` 来告诉浏览器自己采用的压缩方式（因为浏览器在传给服务器的时候一般还告诉服务器自己支持好几种压缩方式），浏览器拿到压缩的文件后，根据自己的解压方式进行解析。

先来看看 Nginx 怎么进行 gzip 配置，和之前的配置一样，为了方便管理，还是在 `/usr/local/nginx/conf/conf.d` 文件夹中新建配置文件 `gzip.conf` ：

```nginx
# /usr/local/nginx/conf/conf.d/gzip.conf

gzip on; # 默认off，是否开启gzip
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

# 上面两个开启基本就能跑起了，下面的愿意折腾就了解一下
# gzip_static on;
# gzip_proxied any;
# gzip_vary on;
# gzip_comp_level 6;
# gzip_buffers 16 8k;
gzip_min_length 1k;
# gzip_http_version 1.1;
```

稍微解释一下：

1. **gzip_types**：要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；
2. **gzip_static**：默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 `.gz` 文件内容；需要编译时安装模块`--with-http_gzip_static_module`
3. **gzip_proxied**：默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；
4. **gzip_vary**：用于在响应消息头中添加 `Vary：Accept-Encoding`，使代理服务器根据请求头中的 `Accept-Encoding` 识别是否启用 gzip 压缩；
5. **gzip_comp_level**：gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；
6. **gzip_buffers**：获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；
7. **gzip_min_length**：允许压缩的页面最小字节数，页面字节数从header头中的 `Content-Length` 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；
8. **gzip_http_version**：默认 1.1，启用 gzip 所需的 HTTP 最低版本；

这个配置可以插入到 http 模块整个服务器的配置里，也可以插入到需要使用的虚拟主机的 `server` 或者下面的 `location` 模块中，当然像上面我们这样写的话就是被 include 到 http 模块中了

配置之后 response 的 header 里面多了一个 `Content-Encoding: gzip`，返回信息被压缩了：

![image-20200427164033577](/images/nginx/gzip.png)

注意了，一般 gzip 的配置建议加上 `gzip_min_length 1k`，不加的话：

由于文件太小，gzip 压缩之后得到了 -48% 的体积优化，压缩之后体积还比压缩之前体积大了，所以最好设置低于 `1kb` 的文件就不要 gzip 压缩了

**未开启前的压缩率：**

![image-20201216100524655](/images/nginx/gzq.png)

**开启后的压缩率：**

![image-20201216100917340](/images/nginx/gzh.png)



### 2) Webpack 的 gzip 配置

> 注意安装插件`compression-webpack-plugin`的时候选择合适的版本，版本过高可能会与环境不兼容导致报错无法build

当前端项目使用 Webpack 进行打包的时候，也可以开启 gzip 压缩：

```js
// vue-cli3 的 vue.config.js 文件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // gzip 配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css/,    // 匹配文件名
          threshold: 10240,               // 文件压缩阈值，对超过10k的进行压缩
          deleteOriginalAssets: false     // 是否删除源文件
        })]
      }
    }
  },
  ...
}
```

由此打包出来的文件如下图：

<img src="img/image-20201216031420168.png" alt="image-20201216031420168" style="zoom:50%;" />

这里可以看到某些打包之后的文件下面有一个对应的 `.gz` 经过 `gzip` 压缩之后的文件，这是因为这个文件超过了 `10kb`，有的文件没有超过 `10kb` 就没有进行 `gzip` 打包，如果你期望压缩文件的体积阈值小一点，可以在 `compression-webpack-plugin` 这个插件的配置里进行对应配置。

那么为啥这里 Nginx 已经有了 gzip 压缩，Webpack 这里又整了个 gzip 呢，因为如果全都是使用 Nginx 来压缩文件，会耗费服务器的计算资源，如果服务器的 `gzip_comp_level` 配置的比较高，就更增加服务器的开销，相应增加客户端的请求时间，得不偿失。

如果压缩的动作在前端打包的时候就做了，把打包之后的高压缩等级文件作为静态资源放在服务器上，Nginx 会优先查找这些压缩之后的文件返回给客户端，相当于把压缩文件的动作从 Nginx 提前给 Webpack 打包的时候完成，节约了服务器资源，所以一般推介在生产环境应用 Webpack 配置 gzip 压缩。



## 13. 适配PC或移动设备

根据用户设备不同返回不同样式的站点，以前经常使用的是纯前端的自适应布局，但无论是复杂性和易用性上面还是不如分开编写的好，比如我们常见的淘宝、京东......这些大型网站就都没有采用自适应，而是用分开制作的方式，根据用户请求的 `user-agent` 来判断是返回 PC 还是 H5 站点。

```nginx
server {
  	listen 8999;
	server_name blog.helloliuxin.cn;

	location / {
		# 适配移动端/PC端配置
        set $type "pc";
        if ($http_user_agent ~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) {
        	set $type "mobile";
         }
         root /usr/web/$type; # 根据设备类型选择设定根目录文件夹名（pc/mobile）
         index  index.html index.htm;
	}
}
```

配置基本没什么不一样的，主要多了一个 `if` 语句，然后使用 `$http_user_agent` 全局变量来判断用户请求的 `user-agent`，指向不同的 root 路径，返回对应站点。

在浏览器访问这个站点，然后 F12 中模拟使用手机访问

可以看到在模拟使用移动端访问的时候，Nginx 返回的站点变成了移动端对应的 html 了。



## 14. 配置HTTPS

具体配置过程网上挺多的了，也可以使用你购买的某某云，一般都会有[免费申请](https://cloud.tencent.com/document/product/400/6814)的服务器证书，安装直接看所在云的操作指南即可。

在你购买的云服务商（比如阿里云）申请免费的SSL证书，然后下载证书的压缩文件，里面有个 nginx 文件夹，把 `xxx.crt` 和 `xxx.key` 文件拷贝到服务器目录，再配置下：

```nginx
server {
  listen 443 ssl http2 default_server;   # SSL 访问端口号为 443
  server_name blog.helloliuxin.cn;         # 填写绑定证书的域名

  ssl_certificate /usr/local/nginx/https/blog.helloliuxin.cn.pem;   # 证书文件地址
  ssl_certificate_key /usr/local/nginx/https/blog.helloliuxin.cn.key;      # 私钥文件地址
  ssl_session_timeout 10m;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;      #请按照以下协议配置
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
  ssl_prefer_server_ciphers on;
  
  location / {
    root         /usr/web/dist;
    index        index.html index.htm;
  }
}
```

写完 `./nginx -t` 校验一下，没问题就 `./nginx -s reload`，现在去访问 `https://blog.helloliuxin.cn:1443` 就能访问 HTTPS 版的网站了。

一般还可以加上几个增强安全性的命令：

```nginx
add_header X-Frame-Options DENY;           # 减少点击劫持
add_header X-Content-Type-Options nosniff; # 禁止服务器自动解析资源类型
add_header X-Xss-Protection 1;             # 防XSS攻击
```

> 注意：需要安装时装上了ssl模块  ./configure --with-http_ssl_module



## 15. 访问控制（设置白名单）

当你的项目没有灰度环境，又想在功能上线后先让测试同事试用一下的时候，就需要设置访问的白名单了。

如果你的项目用上了 nginx 做代理，你就会发现这就是小菜一碟。

参考代码：

```nginx
# 首尾配置暂时忽略
server {
        listen       8080;        
        server_name  localhost;

        location / {
            # IP访问限制（只允许IP是 10.81.22.22 的机器才能访问）
            allow 10.81.22.22;
            deny all;
            
            root   html;
            index  index.html index.htm;
        }
}
# 首尾配置暂时忽略
```

上面代码块中的IP改成你们测试同事机器的IP即可。



## 16. 配置图片防盗链

> 为了不等设计师出图，便想先开发完功能再替换图片。这时候我将从百度找到尺寸差不多的图片引入项目中，竟然发现图片不能正常显示，提示“该图片仅限百度内部用户交流使用”。最后不得不下载这张图片，放入项目中使用。

这是因为百度将图片做了防盗链处理，不允许别的网站以外链的方式进行引用。

那么当我们的项目也想保护自己的图片权益，设置图片防盗链的时候我们怎么实现呢？

```nginx
# 首尾配置暂时忽略
server {
        listen       8080;        
        server_name  localhost;

        location / {
            root   /usr/local/var/www/my-project; # 设置为个人项目的根目录路径
            index  index.html index.htm;
        }
        
        # 图片防盗链
        location ~* \.(gif|jpg|jpeg|png|bmp|swf)$ {
            valid_referers none blocked 192.168.0.103; # 只允许本机IP外链引用
            if ($invalid_referer){
                return 403;
            }
        }
}
# 首尾配置暂时忽略
```

上面代码块设置了只允许本机IP外链引用图片资源，其他域名下的请求都会被403禁止访问。



## 参考资料

- [linux服务器nginx的卸载与安装教程](https://www.jb51.net/article/166079.htm)
- [nginx入门系列之安装与卸载](https://cloud.tencent.com/developer/article/1539924)
- [Nginx 服务器安装及配置文件详解](https://www.runoob.com/w3cnote/nginx-install-and-config.html)
- [nginx的基本配置](https://www.jianshu.com/p/460b23c5db8f)
- [为nginx添加SSL支持模块](https://www.codelast.com/%E5%8E%9F%E5%88%9B-%E4%B8%BAnginx%E6%B7%BB%E5%8A%A0ssl%E6%94%AF%E6%8C%81%E6%A8%A1%E5%9D%97/)
- [Nginx 从入门到实践，万字详解](https://juejin.cn/post/6844904144235413512#heading-0)
- [连前端都看得懂的《Nginx 入门指南》](https://juejin.cn/post/6844904129987526663)



### 增加nginx虚拟主机配置文件(conf.d)

[增加nginx虚拟主机配置文件(conf.d)](https://www.cnblogs.com/fps2tao/p/9958009.html)



### 什么叫虚拟主机？

所谓虚拟主机，也叫“网站空间”，就是把一台运行在互联网上的服务器划分成多个“虚拟”的服务器，每一个虚拟主机都具有独立的域名和完整的Internet服务器（支持WWW、FTP、E-mail等）功能。

一台服务器上的不同虚拟主机是各自独立的，并由用户自行管理。在外界看来，每一台虚拟主机和一台独立的主机完全一样。但一台服务器主机只能够支持一定数量的虚拟主机，当超过这个数量时，用户将会感到性能急剧下降。



### yum

Yum（全称为 Yellow dog Updater, Modified）是一个在Fedora和RedHat以及CentOS中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。

点击查看[常用命令行命令](https://baike.baidu.com/item/yum/2835771?fr=aladdin)



### 如何重置阿里云服务器

[阿里云服务器怎么重装系统或重置系统](https://zhidao.baidu.com/question/395950625496213765.html)



### 阿里云ECS导入密钥对通过ssh登录服务器

[阿里云ECS导入密钥对通过ssh登录服务器](https://blog.csdn.net/toopoo/article/details/103337128)

[阿里云ECS服务器使用SSH密钥对登录，适用普通用户](https://blog.csdn.net/jincheng2817/article/details/86660078)



### .ssh文件夹下的known_hosts文件有什么作用

[SSH之known_hosts文件](https://blog.csdn.net/qq_39387856/article/details/100100903)

[ssh登陆之忽略known_hosts文件](https://blog.csdn.net/yasaken/article/details/7348441)

[Git的.ssh文件夹内容介绍](https://blog.csdn.net/Quincuntial/article/details/52903815)

[known_hosts有什么用？](https://www.cnblogs.com/fonxian/p/11228760.html)



### Linux查看端口占用情况

> Linux查看端口占用情况可以使用**lost**和**netstat**命令

```shell
$ lsof -i:端口号

$ netstat -tunlp | grep 端口号
```

**相关连接**

[Linux查看端口号占用情况](https://www.runoob.com/w3cnote/linux-check-port-usage.html)



### DNS域名解析

**相关连接**

[一张图看懂DNS域名解析全过程](https://www.cnblogs.com/crazylqy/p/7110357.html)



### SSH连接报错:Permission denied, please try again.的解决方法

[SSH连接报错:Permission denied, please try again.的解决方法](https://cloud.tencent.com/developer/article/1454777)



### 阿里云服务器开启密码SSH双登录教程

[阿里云服务器开启密码SSH双登录教程](http://wiki.nooss.cn/archives/296.html?tdsourcetag=s_pcqq_aiomsg)



```shell
cd /usr/local/nginx/sbin/
nginx_num=`ps -ef|grep nginx|grep -v grep|wc -l`;
if [ "$nginx_num" -eq 0 ]; then ./nginx; fi
```



### Linux rpm命令

Linux rpm 命令用于管理套件。

rpm（英文全拼：redhat package manager） 原本是 Red Hat Linux 发行版专门用来管理 Linux 各项套件的程序，由于它遵循 GPL 规则且功能强大方便，因而广受欢迎。逐渐受到其他发行版的采用。RPM 套件管理方式的出现，让 Linux 易于安装，升级，间接提升了 Linux 的适用度。





# tomcat学习笔记

```shell
# 首先进入到tomcat的bin目录下
$ cd /usr/local/tomcat/bin

# 关闭
$ ./shutdown.sh

# 启动
$ ./startup.sh
```

参考资料：

- [如何修改tomcat默认端口号8080的方法](https://www.jb51.net/article/136339.htm)
- [什么是TOMCAT](https://zhuanlan.zhihu.com/p/102988063)
- [Linux(CentOS7)安装Tomcat与设置Tomcat为开机启动项](https://blog.csdn.net/ThinkWon/article/details/102717537)
- [服务器--Tomcat配置2个或多个同时运行（Linux](https://blog.csdn.net/JustinQin/article/details/78563113)
- [tomcat目录结构](https://www.jianshu.com/p/81ec9c51435e)



```shell
##########first tomcat###########
CATALINA_BASE=/usr/local/tomcats/tomcat_1
CATALINA_HOME=/usr/local/tomcats/tomcat_1
TOMCAT_HOME=/usr/local/tomcats/tomcat_1
export CATALINA_BASE CATALINA_HOME TOMCAT_HOME
##########first tomcat############
##########second tomcat##########
CATALINA_2_BASE=/usr/local/tomcats/tomcat_2
CATALINA_2_HOME=/usr/local/tomcats/tomcat_2
TOMCAT_2_HOME=/usr/local/tomcats/tomcat_2
export CATALINA_2_BASE CATALINA_2_HOME TOMCAT_2_HOME
##########second tomcat##########
```

