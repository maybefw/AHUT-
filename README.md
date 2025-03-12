# AHUT-
安徽工业大学晚寝考勤打卡签到  

如何联系？v：_jianlou
# 2025.1.2 更新可用
本次更新添加请求头sign参数，请求体roomid，感觉考勤系统正在完善后续还会更新，当然他更新我也不闲着   
sign参数分析：首先想到的是逆向小程序 可是小程序并不支持电脑端打开 也就没有本地存储 虽然知道appid（wx096f108fde346e0e）但也逆向不了 于是换个想法 直接去考勤系统网站https://xskq.ahut.edu.cn/登录之后里面空荡荡 看请求里面虽然有FlySource-sign但是死活找不到在哪里加密的这个参数！！！找到的都是一些无用的文件....   
<img src="https://github.com/user-attachments/assets/ea082585-b799-4623-bd74-66b52e7c2bd7" alt="image description" width="400" height="300" />   
谷歌一下突然看到小程序有‘在电脑上打开’字样 我也是蠢到家了，这个也能忘！！！   
于是赶紧尝试 成功之后就是打断点调试咯 扣js代码分析sign参数 分析过程中发现 不同请求中的sign参数加密所取得url是不同的！不同的api请求是不同的加密哈哈哈  
也没啥难的 放上成功图    
<img src="https://github.com/user-attachments/assets/f52f8c57-27c4-47b1-8f5a-2aef4ab2b25d" alt="image description" width="400" height="300" />   

# 2024.11.6 项目维护
暂时不更新代码，有需求找我

# 2024.10.23 实现动态签到，新增重试机制
<img src="https://github.com/user-attachments/assets/12af871e-a12a-4c71-84ea-180aa2d2f1d3" alt="image description" width="400" height="300" />


# 2024.10.20 可用 支持部署服务器打卡 添加发送邮件功能
# 配置
<details>
<summary>配置（服务器使用请配置，ps：本人不是服务器提供商！不向任何人以任何形式推销服务器！）</summary>

服务器配置概述：以 windterm 连接工具为例，连接上服务器之后在 /root 目录里拖入 fuwuqiqiandao.js 文件    
连接上服务器之后，执行以下命令：
```
sudo apt update //在安装 Node.js 之前，先更新服务器的软件包列表
sudo apt install curl //安装curl工具
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - //安装nodejs环境
sudo apt install -y nodejs //安装nodejs
node -v
npm -v //检查node和npm版本
```
在服务器上安装axios和nodemailer库   
```
npm install axios
npm install nodemailer
```

实现在服务器上定时执行打卡脚本：   
```
crontab -e //设置 cron 定时任务
20 21 * * * /usr/bin/node /root/fuwuqiqiandao.js >> /root/fuwuqiqiandao.log 2>&1
```   
crontab 文件中添加，20 21 * * *: 这表示每天的 21:20 执行任务

```
cd /root
node fuwuqiqiandao.js //测试脚本
```


</details>

# 使用

```
git clone https://github.com/maybefw/AHUT-.git
```


# 免责声明
本项目及其相关代码、文档和资源均仅供个人学习和非商业用途。任何人不得将本项目用于盈利目的或参与商业活动。
如需使用本项目进行商业活动或获利，必须事先获得我的书面许可。任何未经授权的使用都将被视为违反此声明。   
本项目可能包含由第三方提供的外部链接或资源。我们对这些外部网站或资源的内容、准确性或功能性不作任何担保，亦不对其隐私政策或使用条款承担任何责任。使用这些外部资源完全由用户自行决定，并自担风险。   我们保留随时更改、修改或移除本项目内容的权利，且无需事先通知。本免责声明适用于所有使用者，并将在任何情况下适用。   通过继续使用本项目，即表明您同意并接受此免责声明的所有条款和条件。  
 










