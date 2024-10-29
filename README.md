# AHUT-
安徽工业大学晚寝考勤打卡签到 https://xskq.ahut.edu.cn/wise/
# 2024.10.23 更新多人打卡，涵盖在所有对应的宿舍楼范围内实现动态签到，新增重试机制
<img src="https://github.com/user-attachments/assets/12af871e-a12a-4c71-84ea-180aa2d2f1d3" alt="image description" width="500" height="300" />


# 2024.10.20 可用 支持部署服务器打卡 添加发送邮件功能
# 环境配置（本地测试不用配置 在服务器上使用请配置
服务器配置概述：以windterm连接工具为例，连接上服务器之后在/root目录里拖入fuwuqiqiandao.js文件  
连接上服务器之后，执行以下命令：
```
sudo apt update//在安装 Node.js 之前，先更新服务器的软件包列表  
sudo apt install curl//安装curl工具  
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - //安装nodejs环境  
sudo apt install -y nodejs //安装nodejs  
node -v  
npm -v //检查node和npm版本  
fuwuqiqiandao.js 供在服务器上运行 ，打卡成功之后会有邮件提醒。需要在服务器上安装axios和nodemailer库  
npm install axios  
npm install nodemailer
```
实现在服务器上定时执行打卡脚本  
```
crontab -e//设置 cron 定时任务   
31 21 * * * /usr/bin/node /root/fuwuqiqiandao.js >> /root/fuwuqiqiandao.log 2>&1   
//crontab 文件中添加，30 21 * * *: 这表示每天的 21:30 执行任务  
按下 Ctrl + O 保存文件。  
按下 Enter 确认。  
按下 Ctrl + X 退出编辑器。  
运行 crontab -l 来查看当前的定时任务是否已经添加成功。  
cd /root  
node fuwuqiqiandao.js//测试脚本
```

# 使用
最直接的，使用您的vscode或其他工具克隆本项目到本地   
```
git clone https://github.com/maybefw/AHUT-.git
```

```
qiandao.js 供本地测试 不需要额外安装库  
fuwuqiqiandao.js 供在服务器上运行 ，打卡成功之后会有邮件提醒。需要在服务器上安装axios和nodemailer库
```
```
qiaodao.js里面的学号替换你自己的，密码替换你自己的，经纬度替换为你自己的（需要MD5加密之后得到的32位小，转换网址：https://tool.chinaz.com/tools/md5.aspx  
新建一个文件夹，放入config.html还有qiandao.js,这个文件夹用浏览器打开
```
```
fuwuqiqiandao.js里面的邮箱换成你自己的，学号密码换成自己的，经纬度替换为你自己的（需要MD5加密之后得到的32位小，转换网址：https://tool.chinaz.com/tools/md5.aspx  
接下来的操作参考环境配置
```
# 小小声
其实这个签到实现逻辑很简单，抓登陆的时候的包获取token(看到密码是经过简单的MD5加密之后的，所以对应代码密码位置也需要MD5加密)，抓打卡发送的包，找到打卡对应的api  
加密password也就是简单的MD5加密 发送出的数据是在发送之前就加密了的   
# 抓包过程
```
登录获取token
```
<img src="https://github.com/user-attachments/assets/1e3149ea-ec76-4088-b319-6d49ab4de9fd" alt="phone screenshot" width="200" />

```
打卡向服务器发送打卡数据：
```
<img src="https://github.com/user-attachments/assets/e8a133f4-156d-44de-b34d-97946a2963b1" alt="phone screenshot" width="200" />

```
用的抓包软件是proxypin 。开源，支持苹果appstore 安卓 windows
``` 
开源链接是：https://github.com/wanghongenpin/network_proxy_flutter
# 免责声明

本项目中的所有信息仅供参考，旨在提供一般性指导与信息。我们已尽力确保所提供内容的准确性、完整性和最新性，但无法保证其中内容在所有情况下的适用性、准确性或可靠性。因此，对于因使用项目中任何信息所产生的直接或间接后果，我们不承担任何责任，包括但不限于财务损失、数据损坏、业务中断或其他经济或非经济损害。  
请注意，本项目所含信息不应被视为法律、金融、医疗、税务或其他专业意见或建议的替代。在任何需要专家意见或特定领域专业咨询的情况下，请始终寻求适格专业人士的建议和指导。  
此外，本项目可能包含由第三方提供的外部链接或资源。我们对这些外部网站或资源的内容、准确性或功能性不作任何担保，亦不对其隐私政策或使用条款承担任何责任。使用这些外部资源完全由用户自行决定，并自担风险。  
我们保留随时更改、修改或移除本项目内容的权利，且无需事先通知。本免责声明适用于所有使用者，并将在任何情况下适用。通过继续使用本项目，即表明您同意并接受此免责声明的所有条款和条件。  
如有任何疑问或对免责声明有任何异议，建议您立即停止使用本项目。  






