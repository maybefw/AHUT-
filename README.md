# AHUT-
安徽工业大学晚寝考勤打卡签到 
star本项目之后可提供免费体验打卡到11月10号（服务器到期）   捐赠本项目后可永久打卡   
如何联系？v：jlian0201
# 2024.11.6 项目维护中 
发现针对一些特殊的用户，需要不一样的调试代码来解决，这真的让我很意外 有的时候感觉是在学神学。？暂时不更新代码， 有需求找我

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
 
# 如果你觉得本项目对你有用

<img src="https://github.com/user-attachments/assets/98dd2eaf-7163-4822-93f5-9944f9fead26" width="200" />






