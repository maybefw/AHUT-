# AHUT-
安徽工业大学晚寝考勤打卡签到
# 2024.10.20 可用 
# 环境配置（本地测试不用配置 在服务器上使用请配置
服务器配置概述：以windterm连接工具为例，连接上服务器之后在/root目录里拖入fuwuqiqiandao.js文件  
连接上服务器之后，执行以下命令：  
sudo apt update//在安装 Node.js 之前，先更新服务器的软件包列表  
sudo apt install curl//安装curl工具  
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - //安装nodejs环境  
sudo apt install -y nodejs //安装nodejs  
node -v  
npm -v //检查node和npm版本  
fuwuqiqiandao.js 供在服务器上运行 ，打卡成功之后会有邮件提醒。需要在服务器上安装axios和nodemailer库  
npm install axios  
npm install nodemailer  
//实现在服务器上定时执行打卡脚本  
crontab -e//设置 cron 定时任务   
31 21 * * * /usr/bin/node /root/fuwuqiqiandao.js >> /root/fuwuqiqiandao.log 2>&1   
//crontab 文件中添加，30 21 * * *: 这表示每天的 21:30 执行任务  
按下 Ctrl + O 保存文件。  
按下 Enter 确认。  
按下 Ctrl + X 退出编辑器。  
运行 crontab -l 来查看当前的定时任务是否已经添加成功。  
cd /root  
node fuwuqiqiandao.js//测试脚本  

# 使用
qiandao.js 供本地测试 不需要额外安装库  
fuwuqiqiandao.js 供在服务器上运行 ，打卡成功之后会有邮件提醒。需要在服务器上安装axios和nodemailer库  
代码修改：  
qiaodao.js里面的学号替换你自己的，密码替换你自己的，经纬度替换为你自己的（需要MD5加密之后得到的32位小，转换网址：https://tool.chinaz.com/tools/md5.aspx。  
新建一个文件夹，放入config.html还有qiandao.js,这个文件夹用浏览器打开  
fuwuqiqiandao.js里面的邮箱换成你自己的，学号密码换成自己的，经纬度替换为你自己的（需要MD5加密之后得到的32位小，转换网址：https://tool.chinaz.com/tools/md5.aspx  
# 小小声
其实这个签到实现逻辑很简单，抓登陆的时候的包获取token(看到密码是经过简单的MD5加密之后的，所以对应代码密码位置也需要MD5加密)，抓打卡发送的包，找到打卡对应的api  
登录包：  
![image](https://github.com/user-attachments/assets/1e3149ea-ec76-4088-b319-6d49ab4de9fd)
打卡包：  
![07b557507a76b9da77932eece4781db](https://github.com/user-attachments/assets/e8a133f4-156d-44de-b34d-97946a2963b1)  
用的抓包软件是proxypin 。开源，支持苹果appstore 安卓 windows





