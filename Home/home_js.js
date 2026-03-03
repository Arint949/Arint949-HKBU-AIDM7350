document.addEventListener('DOMContentLoaded', () => {
// 侧边栏相关元素
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

// 侧边栏切换 - 保持逻辑不变，动画由CSS控制
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // 阻止事件冒泡
  sidebar.classList.toggle('active');
  document.body.classList.toggle('sidebar-open');
});

// 点击页面其他区域关闭侧边栏
document.addEventListener('click', (e) => {
  // 如果点击的不是侧边栏也不是菜单按钮，则关闭
  if (!sidebar.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
    sidebar.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }
});

// 天气信息DOM元素
// 天气信息DOM元素
  const locationEl = document.getElementById('location');
  const tempEl = document.getElementById('temp');
  const conditionEl = document.getElementById('condition');
  const highLowEl = document.getElementById('high-low');

  // 【模拟】天气数据（实际需替换为真实API请求）
  const mockWeatherData = {
    location: '九龙塘',
    temp: '23°C',
    condition: '晴',
    high: '24°C',
    low: '18°C'
  };

  // 尝试获取用户定位（用于调用天气API）
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 步骤1：获取经纬度
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // 步骤2：调用天气API（示例用OpenWeatherMap，需替换为自己的API密钥）
        // 实际项目中需替换为：
         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric&lang=zh_cn`)
           .then(res => res.json())
           .then(data => {
             // 处理返回数据，更新页面
             const weatherData = {
               location: data.name,
               temp: `${Math.round(data.main.temp)}°C`,
               condition: data.weather[0].description,
               high: `${Math.round(data.main.temp_max)}°C`,
               low: `${Math.round(data.main.temp_min)}°C`
             };
             updateWeatherUI(weatherData);
           })
           .catch(err => {
             console.error('天气API请求失败：', err);
             updateWeatherUI(mockWeatherData); // 失败时显示模拟数据
           });

        // 【模拟】定位成功，直接显示模拟数据
        updateWeatherUI(mockWeatherData);
      },
      (error) => {
        // 定位失败（如用户拒绝、浏览器不支持）
        console.log('定位失败原因：', error.message);
        updateWeatherUI(mockWeatherData); // 显示模拟数据
      }
    );
  } else {
    // 浏览器不支持定位API
    updateWeatherUI(mockWeatherData);
  }

  // 更新天气信息到页面
  function updateWeatherUI(data) {
    locationEl.textContent = data.location || '未知地区';
    tempEl.textContent = data.temp || '--';
    conditionEl.textContent = data.condition || '--';
    highLowEl.textContent = `↑${data.high || '--'} ↓${data.low || '--'}`;
  }
});