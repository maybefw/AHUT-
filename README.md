# AHUT-
安徽工业大学晚寝考勤打卡签到 https://xskq.ahut.edu.cn/wise/   
star本项目之后可提供免费体验打卡到11月10号（服务器到期）   捐赠本项目后永久体验打卡

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

<details>
  <summary>本地和服务器的签到脚本使用说明</summary>

  **本地测试使用 `qiandao.js`，无需额外安装库：**
  - 直接将 `qiandao.js` 文件中的学号替换为你自己的，密码替换为你自己的，经纬度替换为你自己的（需要通过 MD5 加密得到 32 位小写值）。MD5 转换网址：[https://tool.chinaz.com/tools/md5.aspx](https://tool.chinaz.com/tools/md5.aspx)。
  
  **服务器运行使用 `fuwuqiqiandao.js`，成功打卡后会有邮件提醒：**
  - 在服务器上运行时，需要安装 `axios` 和 `nodemailer` 库。
  - 将 `fuwuqiqiandao.js` 文件中的邮箱替换为你自己的，学号和密码替换为你自己的，经纬度替换为你自己的（也需要 MD5 加密得到的 32 位小写值）。

  **操作步骤：**
  1. 新建一个文件夹，将 `config.html` 和 `qiandao.js` 放入该文件夹。
  2. 使用浏览器打开此文件夹。
  3. 参考环境配置完成相关设置。
</details>



# 抓包
<details>
<summary>抓包过程</summary>
其实这个签到实现逻辑很简单，抓登陆的时候的包获取token(看到密码是经过简单的MD5加密之后的，所以对应代码密码位置也需要MD5加密)，抓打卡发送的包，找到打卡对应的api  
加密password也就是简单的MD5加密 发送出的数据是在发送之前就加密了的   

<img src="https://github.com/user-attachments/assets/1e3149ea-ec76-4088-b319-6d49ab4de9fd" alt="phone screenshot" width="200" />

<img src="https://github.com/user-attachments/assets/e8a133f4-156d-44de-b34d-97946a2963b1" alt="phone screenshot" width="200" />

开源链接是：https://github.com/wanghongenpin/network_proxy_flutter

</details>

# 免责声明
请注意，本项目所含信息不应被视为法律、金融、医疗、税务或其他专业意见或建议的替代。
此外，本项目可能包含由第三方提供的外部链接或资源。我们对这些外部网站或资源的内容、准确性或功能性不作任何担保，亦不对其隐私政策或使用条款承担任何责任。使用这些外部资源完全由用户自行决定，并自担风险。  我们保留随时更改、修改或移除本项目内容的权利，且无需事先通知。本免责声明适用于所有使用者，并将在任何情况下适用。通过继续使用本项目，即表明您同意并接受此免责声明的所有条款和条件。  
如有任何疑问或对免责声明有任何异议，建议您立即停止使用本项目。  
# 如果你觉得本项目对你有用

<img src="https://github.com/user-attachments/assets/98dd2eaf-7163-4822-93f5-9944f9fead26" width="200" />






