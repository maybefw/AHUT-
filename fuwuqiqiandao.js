const axios = require('axios');  // 引入 axios
const nodemailer = require('nodemailer');  // 引入 nodemailer


// 获取 Token 的函数
const getToken = async () => {
    try {
        const response = await axios.post('https://xskq.ahut.edu.cn/api/flySource-auth/oauth/token', new URLSearchParams({
            tenantId: '000000',
            username: '',  // 学号
            password: "6e414d222e2765b8ed2501f1df15ffdf", // ''里面写你的密码,是加密后的密码，32位小，比如初始密码Ahgydx@920加密后就是6e414d222e2765b8ed2501f1df15ffdf，加密地址：https://tool.chinaz.com/tools/md5.aspx  // 如果你没改密码还是Ahgydx@920，这部分不需要改
            type: 'account',
            grant_type: 'password',
            scope: 'all'
        }), {
            headers: {
                'Authorization': 'Basic Zmx5c291cmNlX3dpc2VfYXBwOkRBNzg4YXNkVURqbmFzZF9mbHlzb3VyY2VfZHNkYWREQUlVaXV3cWU=',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });

        const data = response.data;
        if (response.status === 200) {
            console.log('Token:', data.access_token); // 获取到的 Token
            return data.access_token;
        } else {
            console.error('登录失败:', data);
            return null;
        }
    } catch (error) {
        console.error('请求失败:', error);
        return null;
    }
};

// 获取当前时间，格式化为 HH:MM:SS
const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// 获取当前日期，格式化为 YYYY-MM-DD
const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 获取当前星期几
const getCurrentWeekday = () => {
    const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const now = new Date();
    const day = now.getDay(); // 获取星期几（0-6，0为星期日）
    return days[day];
};

// 邮件发送的功能
const sendEmail = async (subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'qq',  // 使用 QQ 邮箱发送stmp.qq.com
        auth: {
            user: '3802496195@qq.com',  // 替换为你的邮箱
            pass: 'sucvdtcshsfqcfcj'   // 替换为你生成的应用专用密码
        }
    });

    const mailOptions = {
        from: '3802496195@qq.com',  // 替换为你的邮箱
        to: '2814249606@qq.com',  // 收件人邮箱
        subject: subject,  // 邮件主题
        text: text          // 邮件内容
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('邮件发送成功:', info.response);
    } catch (error) {
        console.error('邮件发送失败:', error);
    }
};

// 签到的函数，使用获取到的时间、日期和星期
const signIn = async (token) => {
    if (!token) {
        console.error('Token 未获取到，无法进行签到');
        return;
    }

    const currentDate = getCurrentDate(); // 获取当前日期
    const currentTime = getCurrentTime(); // 获取当前时间
    const currentWeekday = getCurrentWeekday(); // 获取当前星期几

    const payload = {
        "taskId": "ec7f0f0fb0f6702f61da122ebf0eb592",
        "signAddress": "宿舍楼",
        "locationAccuracy": 7.8,
        "signLat": 31.690481,
        "signLng": 118.516914,
        "signType": 0,
        "fileId": "",
        "imgBase64": "/static/images/dormitory/photo.png",
        "signDate": currentDate,  // 使用当前日期
        "signTime": currentTime,  // 使用当前时间
        "signWeek": currentWeekday,  // 使用当前星期几
        "scanCode": ""
    };

    try {
        const response = await axios.post('https://xskq.ahut.edu.cn/api/flySource-yxgl/dormSignRecord/add', payload, {
            headers: {
                'FlySource-Auth': `bearer ${token}`,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });

        const data = response.data;
        if (response.status === 200) {
            console.log('打卡成功:', data.msg);

            // 打卡成功后发送邮件提醒
            await sendEmail('签到成功通知', `您的打卡已成功！时间：${currentDate} ${currentTime}`);
        } else {
            console.error('打卡失败:', data.msg);

            // 打卡失败后发送邮件提醒
            await sendEmail('签到失败通知', `签到失败，错误信息：${data.msg}`);
        }
    } catch (error) {
        console.error('请求失败:', error);

        // 请求失败后发送邮件提醒
        await sendEmail('签到失败通知', `请求失败，错误信息：${error.message}`);
    }
};

// 获取 Token 并开始签到
getToken().then(token => {
    if (token) {
        signIn(token);
    }
});

