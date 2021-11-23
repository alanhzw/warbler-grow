/*
 * @Description:canvas练习--画板
 * @Autor: hanzhiwei
 * @Date: 2021-01-28 17:58:48
 * @LastEditTime: 2021-05-31 15:11:16
 * @FilePath: \练习html拖放apid:\myvue\CANVAS练习\画板项目练习\testCanvas\01\01.js
 */
((doc) => {
  // 声明一些常量
  const CANVAS_WIDTH = 500; // canvas的宽
  const CANVAS_HEIGHT = 500; // canvas的高
  const CANVAS_PEN = 'pen'; // 画笔
  const CANVAS_RECT = 'rect'; // 矩形
  const CANVAS_CIRCLE = 'circle'; // 圆形
  const STYLE_ROUND = 'round'; // 圆角样式
  // 获取canvas对象
  const canvas = doc.querySelector('#canvas');
  // 获取画图工具箱
  const tools = canvas.getContext('2d');
  // 获取按钮
  const penBtn = doc.querySelector('#pen'); // 画笔
  const rectBtn = doc.querySelector('#rect'); // 矩形
  const circleBtn = doc.querySelector('#circle'); // 圆形
  const sizeBtn = doc.querySelector('#size'); // 画笔大小
  const colorBtn = doc.querySelector('#color'); // 颜色
  // 画笔的当前状态
  let penStatus = {
    isDraw: false, // 是否可以画图
    type: CANVAS_PEN, // 当前处于什么状态
    beginCoordinateX: 0, // 鼠标上一次的位置X  ||  鼠标按下的起始位置x
    beginCoordinateY: 0, // 鼠标上一次的位置Y  ||  鼠标按下的起始位置y
    imageData: '', // 保留的当前画板
  };
  // 初始化canvas
  const initCanvas = () => {
    // 设定canvas大小
    canvas.setAttribute('width', CANVAS_WIDTH + 'px');
    canvas.setAttribute('height', CANVAS_HEIGHT + 'px');
  };

  // 绑定事件函数
  const bindEvents = () => {
    penBtn.addEventListener('click', handlePen); // 画笔
    rectBtn.addEventListener('click', handleRect); // 矩形
    circleBtn.addEventListener('click', handleCircle); // 圆形
    sizeBtn.addEventListener('click', handleSize); // 画笔大小
    colorBtn.addEventListener('click', handleColor); // 颜色
    canvas.addEventListener('mousedown', handleBeginDraw); // 鼠标按下开始画图
    canvas.addEventListener('mouseup', handleStopDraw); // 鼠标松开停止画图
    canvas.addEventListener('mousemove', handleDrawing); // 鼠标移动进行画图
  };

  // 点击画笔
  const handlePen = () => {
    penStatus.type = CANVAS_PEN;
    console.log('handlePen');
  };
  // 点击矩形
  const handleRect = () => {
    penStatus.type = CANVAS_RECT;
    console.log('handleRect');
  };
  // 点击圆形
  const handleCircle = () => {
    penStatus.type = CANVAS_CIRCLE;
    console.log('handleCircle');
  };
  // 点击画笔大小
  const handleSize = () => {
    tools.lineWidth = 10;
  };
  // 点击画笔颜色
  const handleColor = () => {
    tools.strokeStyle = '#ff3333';
  };
  // 鼠标按下开始画图
  const handleBeginDraw = (e) => {
    // 允许画图
    penStatus.isDraw = true;
    // 记录鼠标按下的位置
    let x = e.offsetX;
    let y = e.offsetY;
    penStatus.beginCoordinateX = x;
    penStatus.beginCoordinateY = y;
    console.log('beginDraw');
  };
  // 鼠标松开停止画图
  const handleStopDraw = () => {
    // 禁止画图
    penStatus.isDraw = false;
    // 保留当前图像
    penStatus.imageData = tools.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    console.log('stopDraw');
  };
  // 鼠标移动进行画图
  const handleDrawing = (e) => {
    if (penStatus.isDraw) {
      drawStyle[penStatus.type](e);
    }
  };

  const drawStyle = {
    // 画线的方法
    pen: (e) => {
      // 当前鼠标指针的位置
      let x = e.offsetX;
      let y = e.offsetY;
      // 上一次鼠标指针的位置
      let oldX = penStatus.beginCoordinateX;
      let oldY = penStatus.beginCoordinateY;
      // 线条的结束端点样式
      tools.lineCap = STYLE_ROUND;
      // 两条线相交时，所创建的拐角样式
      tools.lineJoin = STYLE_ROUND;
      tools.beginPath();
      tools.moveTo(oldX, oldY);
      tools.lineTo(x, y);
      tools.stroke();
      // 保留当前鼠标指针的位置
      penStatus.beginCoordinateX = x;
      penStatus.beginCoordinateY = y;
    },
    // 画矩形的方法
    rect: (e) => {
      let imgData;
      (() => {
        // 当前鼠标指针的位置
        let x = e.offsetX;
        let y = e.offsetY;
        // 开始画矩形的位置
        let beginX = penStatus.beginCoordinateX;
        let beginY = penStatus.beginCoordinateY;
        tools.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        if (penStatus.imageData) {
          tools.putImageData(penStatus.imageData, 0, 0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
        tools.beginPath();
        tools.rect(beginX, beginY, x - beginX, y - beginY);
        tools.stroke();
      })();
    },
    // 画圆的方法
    circle: (e) => {
      let x = e.offsetX;
      let y = e.offsetY;
      // 开始画圆形的位置
      let beginX = penStatus.beginCoordinateX;
      let beginY = penStatus.beginCoordinateY;
      tools.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      if (penStatus.imageData) {
        tools.putImageData(penStatus.imageData, 0, 0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      tools.beginPath();
      tools.arc(x, y, 20, 0, Math.PI * 2, false);
      tools.stroke();
    },
  };

  // 初始化函数
  const init = () => {
    initCanvas();
    bindEvents();
  };

  // 执行初始化函数
  init();
})(document);
