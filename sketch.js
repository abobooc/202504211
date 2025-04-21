let seaweeds = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container'); // 将画布添加到 canvas-container 中
  blendMode(BLEND); // 设置混合模式

  let colors = ["#3a5a40", "#344e41", "#a3b18a"];
  let numLines = 40; // 设置线条数量

  for (let i = 0; i < numLines; i++) {
    let x = (i + 1) * windowWidth / (numLines + 1);
    let height1 = windowHeight;
    let height2 = windowHeight * (3 / 4 + random(-0.1, 0.1));
    let height3 = windowHeight * (5 / 8 + random(-0.1, 0.1));
    let height4 = windowHeight * (1 / 2 + random(-0.1, 0.1));
    let color = colors[i % colors.length] + hex(floor(random(100, 200)), 2); // 增加透明度
    let weight = random(10, 30);
    let sway = random(30, 50); // 增加左右摆动的范围

    seaweeds.push({ x, height1, height2, height3, height4, color, weight, sway });
  }
}

function draw() {
  clear(); // 清除画布，使背景透明

  // 绘制海草动画
  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i];
    let x1 = seaweed.x;
    let y1 = seaweed.height1;

    // 根据鼠标位置动态调整摆动幅度
    let mouseInfluence = map(mouseX, 0, width, -1, 1); // 鼠标位置影响范围
    let x2 = x1 + sin(frameCount * 0.005 + i) * seaweed.sway * mouseInfluence;
    let y2 = seaweed.height2;
    let x3 = x1 + sin(frameCount * 0.01 + i) * seaweed.sway * mouseInfluence;
    let y3 = seaweed.height3;
    let x4 = x1 + sin(frameCount * 0.015 + i) * seaweed.sway * mouseInfluence;
    let y4 = seaweed.height4;

    stroke(seaweed.color); // 设置线条颜色
    strokeWeight(seaweed.weight); // 设置随机线条粗细
    noFill();

    beginShape();
    vertex(x1, y1);
    bezierVertex(x2, y2, x3, y3, x4, y4);
    endShape();
  }

  // 绘制文字
  drawTitle();
}

function drawTitle() {
  textAlign(CENTER, CENTER);
  textSize(40);
  textStyle(NORMAL); // 设置文字为正常粗细
  fill(255); // 设置文字颜色为白色

  // 计算文字旋转角度
  let angle = atan2(mouseY - height / 2, mouseX - width / 2);

  push();
  translate(width / 2, height / 2); // 将原点移动到画布中心
  rotate(angle); // 根据鼠标位置旋转文字
  text("襪!期中報告", 0, 0); // 在原点绘制文字
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}