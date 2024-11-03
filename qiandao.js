const getToken = async () => {
  try {
    const response = await fetch(
      "https://xskq.ahut.edu.cn/api/flySource-auth/oauth/token",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic Zmx5c291cmNlX3dpc2VfYXBwOkRBNzg4YXNkVURqbmFzZF9mbHlzb3VyY2VfZHNkYWREQUlVaXV3cWU=",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          tenantId: "000000",
          username: "", // 学号
          password: "6e414d222e2765b8ed2501f1df15ffdf", //加密之后的密码
          type: "account",
          grant_type: "password",
          scope: "all",
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Token:", data.access_token);
      return data.access_token;
    } else {
      console.error("登录失败:", data);
      return null;
    }
  } catch (error) {
    console.error("请求失败:", error);
    return null;
  }
};


const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};


const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


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
  const day = now.getDay(); 
  return days[day];
};

const signIn = async (token) => {
  if (!token) {
    console.error("Token 未获取到，无法进行签到");
    return;
  }

  const currentDate = getCurrentDate(); // 获取当前日期
  const currentTime = getCurrentTime(); // 获取当前时间
  const currentWeekday = getCurrentWeekday(); // 获取当前星期几

  const payload = {
    taskId: "ec7f0f0fb0f6702f61da122ebf0eb592",
    signAddress: "宿舍楼",
    locationAccuracy: 7.8,
    signLat: 31.690481,
    signLng: 118.516914, 
    signType: 0,
    fileId: "",
    imgBase64: "/static/images/dormitory/photo.png",
    signDate: currentDate, 
    signTime: currentTime, 
    signWeek: currentWeekday, 
    scanCode: "",
  };

  try {
    const response = await fetch(
      "https://xskq.ahut.edu.cn/api/flySource-yxgl/dormSignRecord/add",
      {
        method: "POST",
        headers: {
          "FlySource-Auth": `bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("打卡成功:", data.msg);
    } else {
      console.error("打卡失败:", data.msg);
    }
  } catch (error) {
    console.error("请求失败:", error);
  }
};


getToken().then((token) => {
  if (token) {
    signIn(token);
  }
});
