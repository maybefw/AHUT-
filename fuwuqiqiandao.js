const axios = require('axios');
const nodemailer = require('nodemailer');

// 定义宿舍楼的坐标信息
const dormLocations = {
    '1号楼': { lat: 31.69037, lng: 118.516967 },
    '2号楼': { lat: 31.69101, lng: 118.517666 },
    '3号楼': { lat: 31.691204, lng: 118.518159 },
    '4号楼': { lat: 31.691376, lng: 118.516531 },
    '5A': { lat: 31.691813, lng: 118.517347 },
    '东区E': { lat: 31.675389, lng: 118.556358 },
    '东区F': { lat: 31.675671, lng: 118.556382 },
    '东区A': { lat: 31.674361, lng: 118.555185 },
    '东区B': { lat: 31.674696, lng: 118.555175 },
    '东区C': { lat: 31.675176, lng: 118.555137 },
    '东区D': { lat: 31.675517, lng: 118.555172 },
    '6号楼': { lat: 31.673468, lng: 118.556072 },
    'H3': { lat: 31.676747, lng: 118.555024 },
    'H2': { lat: 31.676392, lng: 118.554955 },
    '7号楼': { lat: 31.673539, lng: 118.556576 },
    '3号楼东区': { lat: 31.67326, lng: 118.55645 },
    '4号楼东区': { lat: 31.673249, lng: 118.556011 },
    '9号楼': { lat: 31.671468, lng: 118.555914 },
    'J1': { lat: 31.676258, lng: 118.551739 },
    'J2': { lat: 31.676664, lng: 118.551529 },
    'J3': { lat: 31.677047, lng: 118.551696 },
    'G1': { lat: 31.676054, lng: 118.553581 },
    'G2': { lat: 31.676301, lng: 118.553777 },
    'G3': { lat: 31.676757, lng: 118.553741 },
    'K1': { lat: 31.676695, lng: 118.555652 },
    'K3': { lat: 31.677381, lng: 118.555756 },
    'L1': { lat: 31.677212, lng: 118.554803 },
    'L2': { lat: 31.677417, lng: 118.554936 },
};

// 定义多个用户的账号信息和宿舍楼
const users = [
    { username: '', password: '6e414d222e2765b8ed2501f1df15ffdf', email: '@qq.com', dorm: '1号楼' },
    { username: '', password: '', email: '@qq.com', dorm: '1号楼' },
    { username: '', password: '6e414d222e2765b8ed2501f1df15ffdf', email: '@qq.com', dorm: 'L2' },
    { username: '', password: '', email: '@qq.com', dorm: '1号楼' }
];//username是你的学号，password是经过MD5加密后的密码，如果您还是初始密码A开头的密码，那就默认是6e414d222e2765b8ed2501f1df15ffdf
const MAX_RETRY_COUNT = 2;  // 设置最大重试次数
// 获取Token的函数
const getToken = async (username, password) => {
    try {
        const response = await axios.post('https://xskq.ahut.edu.cn/api/flySource-auth/oauth/token', new URLSearchParams({
            tenantId: '000000',
            username: username,
            password: password,
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
          console.log(`${username} 登录成功, Token:`, data.access_token); // 获取到的 Token
          return data.access_token;
        } else {
          console.error(`${username} 登录失败:`, data);
          return null;
        }
      } catch (error) {
        console.error(`${username} 请求失败:`, error);
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
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 获取当前星期几
const getCurrentWeekday = () => {
  const days = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const now = new Date();
  const day = now.getDay(); // 获取星期几（0-6，0为星期日）
  return days[day];
};

// 发送邮件的函数
const sendEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '',//这里是你自己申请的发送到你邮箱的邮箱，可注册一个小号，并且获取专用密码（前往qq官网了解专用密码）
            pass: ''//你的专用密码
        }
    });

    let mailOptions = {
        from: '',//是你自己申请的发送到你邮箱的邮箱，可注册一个小号，和上面user一样的邮箱
        to: to,//这里是你要发送的邮箱，可设置成你的大号，在上面user用户信息里设置，to不用改哦！
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`邮件发送成功: ${to}`);
    } catch (error) {
        console.error(`邮件发送失败: ${error.message}`);
    }
};

// 生成动态经纬度的函数，微调最后两位小数
const getDynamicLocation = (lat, lng) => {
    // 生成随机数，微调最后两位小数
    const randomOffset = () => Math.random() * 0.01 - 0.005;
    const newLat = (lat + randomOffset()).toFixed(6);
    const newLng = (lng + randomOffset()).toFixed(6);
    return { lat: newLat, lng: newLng };
};

// 签到函数，动态传入宿舍坐标
const signIn = async (token, user, retryCount = 0) => {
    if (!token) {
        console.error(`${user.username} 的 Token 未获取到，无法进行签到`);
        return;
    }
   
    const currentDate = getCurrentDate(); // 获取当前日期
    const currentTime = getCurrentTime(); // 获取当前时间
    const currentWeekday = getCurrentWeekday(); // 获取当前星期几
    const dormLocation = dormLocations[user.dorm];  // 获取用户宿舍的经纬度坐标
    if (!dormLocation) {
        console.error(`未找到宿舍: ${user.dorm} 的位置信息`);
        return;
    }

    // 生成动态的签到位置
    const dynamicLocation = getDynamicLocation(dormLocation.lat, dormLocation.lng);

    const payload = {
      taskId: "ec7f0f0fb0f6702f61da122ebf0eb592",//这里的taskid在2025年1月份之后会改变，作者猜测不同学期有不同taskid
      signAddress: "宿舍楼",
      locationAccuracy: 7.8,
      signLat: dynamicLocation.lat,
      signLng: dynamicLocation.lng,
      signType: 0,
      fileId: "",
      imgBase64: "/static/images/dormitory/photo.png",
      signDate: currentDate, // 使用当前日期
      signTime: currentTime, // 使用当前时间
      signWeek: currentWeekday, // 使用当前星期几
      scanCode: ""
    };

    try {
        const response = await axios.post(
          "https://xskq.ahut.edu.cn/api/flySource-yxgl/dormSignRecord/add",
          payload,
          {
            headers: {
              "FlySource-Auth": `bearer ${token}`,
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        const data = response.data
        if (response.status === 200) {
            console.log(`${user.username} 签到成功`);
            await sendEmail(user.email, '打卡成功', `${user.username} 打卡成功: ${data.msg} 时间：${currentDate} ${currentTime}`)
       
        } else {
            console.error(`${user.username} 签到失败:`, response.data);
            // 如果签到失败，重试机制
            if (retryCount < MAX_RETRY_COUNT) {
                console.log(`${user.username} 正在进行第 ${retryCount + 1} 次重试...`);
                await signIn(token, user, retryCount + 1); // 递归重试
            } else {
                console.error(`${user.username} 签到失败，达到最大重试次数`);
                await sendEmail(user.email, '打卡失败', `${user.username} 打卡失败: ${data.msg}`)
            
            }
        }
    } catch (error) {
      console.error(`${user.username} 请求失败:, error`);
      if (retryCount < MAX_RETRY_COUNT) {
          console.log(`${user.username} 正在进行重试，第 ${retryCount + 1} 次重试`);
          await signIn(token, user, retryCount + 1);  // 重新签到
      } else {
          console.log(`${user.username} 达到最大重试次数，签到失败`);
          await sendEmail(user.email, '请求失败', `${user.username} 请求失败: ${error.message}`);
      }
      }
};

// 遍历每个用户，获取 Token 并签到
const signInAllUsers = async () => {
    for (const user of users) {
      const token = await getToken(user.username, user.password); // 逐个获取用户 Token
      if (token) {
        await signIn(token, user); // 使用对应用户的 Token 进行签到
      }
    }
  };
  // 执行签到
signInAllUsers();
