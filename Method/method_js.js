document.addEventListener('DOMContentLoaded', function() {
  const tagItems = document.querySelectorAll('.tag-item');
  const textMask = document.querySelector('.text');
  const methodList = document.querySelector('.method-list');
  const detailLink = document.querySelector('.detail-link');

  let currentActiveTag = null;

  function closeMask() {
    currentActiveTag = null;
    
    textMask.classList.remove('active');
    document.body.style.overflow = 'auto';
    methodList.innerHTML = '';
    
    tagItems.forEach(item => {
      item.classList.remove('active', 'moved', 'hidden');
    });
  }

  // 点击遮罩内部触发关闭
  textMask.addEventListener('click', function() {
    closeMask();
  });

  // 天气措施映射
  const weatherMethods = {
    rain: [
      "减少外出，避开低洼积水区（如地下通道、涵洞），绕开落水管和电箱",
      "家中提前清理阳台/厨房地漏，防止雨水倒灌；若进水先断电源再排水",
      "驾车遇积水（超过轮胎1/2）立即停车，勿强行通过，避免熄火",
      "户外遇雷电时，远离大树、电线杆、广告牌，不使用手机和金属物品",
      "关注气象预警，若发布红色预警，立即转移至高处安全区域"
    ],
    temp: [
      "10:00-16:00避免外出，外出穿浅色系宽松衣裤，戴遮阳帽和防紫外线墨镜",
      "每1-2小时喝150-200ml温水（加少许盐），忌冰饮，防脱水和中暑",
      "室内开空调温度不低于26℃，定期开窗通风，避免温差过大感冒",
      "老人、儿童、慢性病患者减少外出，备藿香正气水等防暑药品",
      "车内不放打火机、香水等易燃易爆物，避免暴晒后自燃"
    ],
    typhoon: [
      "提前加固门窗（贴米字胶防玻璃碎），收起阳台花盆、衣物等易坠物品",
      "台风期间不外出，远离窗户、广告牌、塔吊、大树等危险区域",
      "检查家中电路、燃气，遇停电/漏气立即关总阀，不使用明火照明",
      "沿海/低洼住户提前转移至社区避险点，备矿泉水、饼干、手电筒等物资",
      "台风后不立即靠近断树、倒杆，确认无漏电/燃气泄漏再通行"
    ],
    freezing: [
      "外出穿防风保暖衣物，戴手套、围巾、耳罩，重点保护手脚末梢部位",
      "室内用空调/暖气取暖时，定期开窗通风，避免一氧化碳中毒",
      "户外水管用保温棉包裹，夜间关紧阳台门窗，防止水管冻裂",
      "驾车出行前检查轮胎胎压，遇结冰路面减速慢行，不猛踩刹车",
      "老人、儿童减少外出，外出返回后用37-40℃温水泡手脚，忌用开水"
    ],
    convection: [
      "短时强降雨+大风时，立即到室内躲避，勿在空旷地、桥下、树下停留",
      "远离户外广告牌、临时搭建物、塔吊，防止被风吹倒砸伤",
      "雷电天气不使用手机、电脑，不触碰水管、暖气片等金属设施",
      "农村地区防范冰雹，关好门窗，用木板覆盖农作物和车辆",
      "强对流过后，检查房屋屋顶和外墙，及时修复脱落瓦片或构件"
    ],
    dry: [
      "日常生活节约用水（淘米水浇花、淋浴限时5分钟），不浪费水资源",
      "农业种植选耐旱作物，采用滴灌技术，避免漫灌浪费水",
      "禁止野外烧烤、烧荒，林区入口不携带火种，防森林火灾",
      "室内用加湿器（湿度保持40%-60%），或放水盆，缓解皮肤干燥",
      "关注当地供水通知，提前储备2-3天生活用水，应对限时供水"
    ],
    sandstorm: [
      "关闭门窗，用湿毛巾堵门缝/窗缝，减少沙尘进入；室内用空气净化器",
      "外出必须戴N95口罩（防沙尘吸入）和防风镜，不戴隐形眼镜",
      "不骑自行车/电动车，驾车减速慢行，开雾灯+示廓灯，保持安全车距",
      "外出返回后，立即清洗面部、口鼻，更换衣物，避免沙尘残留引发过敏",
      "呼吸道敏感人群（哮喘/鼻炎患者）减少外出，遵医嘱备急救药品"
    ]
  };

  // 标签点击逻辑
  tagItems.forEach(tag => {
    const tagBg = tag.getAttribute('data-bg');
    tag.style.backgroundImage = `url('${tagBg}')`;

    tag.addEventListener('click', function() {
      // 如果点击的是已激活的标签，关闭遮罩层
      if (this.classList.contains('active')) {
        closeMask();
        return;
      }

      // 重置所有标签状态
      closeMask();

      // 隐藏其他标签，当前标签激活并移动
      tagItems.forEach(item => {
        item.classList.add('hidden');
      });
      this.classList.remove('hidden');
      this.classList.add('active', 'moved');
      currentActiveTag = this;

      const weatherType = this.getAttribute('data-type');
      
      // 填充ul正文
      methodList.innerHTML = weatherMethods[weatherType].map(method => `<li>${method}</li>`).join('');

      // 显示遮罩层
      textMask.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // 详情链接跳转（保持不变）
  if (detailLink) {
    detailLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '../Info/Info.html';
    });
  }
});