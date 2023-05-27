// Canvas要素を取得
const canvas = document.getElementById('graph');
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d');

// 点を描画する関数
function drawPoint(x, y, color, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// 点の座標とスタイルを指定して描画
// drawPoint(50, 50, 'red', 5);


// 四角形を描画する関数
function drawRectangle(x, y, width, height, color, filled) {
  if (filled) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
  }
}

// 四角形を描画
// drawRectangle(0, 10, 500, 500, 'blue', true);  // 塗りつぶした青い四角形を描画
// drawRectangle(200, 200, 100, 100, 'red', false);  // 枠線の赤い四角形を描画



const gradientColor = (startColor, endColor, startValue, endValue, currentValue) => {
  if (endValue <= startValue) {
    throw new Error('color function の開始値と終了値の大小関係が逆');
  }
  const startR = parseInt(startColor.slice(1, 3), 16);
  const startG = parseInt(startColor.slice(3, 5), 16);
  const startB = parseInt(startColor.slice(5, 7), 16);
  const endR = parseInt(endColor.slice(1, 3), 16);
  const endG = parseInt(endColor.slice(3, 5), 16);
  const endB = parseInt(endColor.slice(5, 7), 16);

  if (currentValue <= startValue) {
    return rgbToColorString(startR, startG, startB);
  } else if (endValue <= currentValue) {
    return rgbToColorString(endR, endG, endB);
  } else {
    const position = (currentValue - startValue) / (endValue - startValue);
    const r = startR + (endR - startR) * position;
    const g = startG + (endG - startG) * position;
    const b = startB + (endB - startB) * position;
    return rgbToColorString(r, g, b);
  }
}

const rgbToColorString = (r,g,b) => {
  return `rgb(${r},${g},${b})`;
}



const xMax = 1;
const yMax = 1;
const xMin = -1;
const yMin = -1;
const xRes = 0.01;
const yRes = 0.01;

const xMaxIterations = (xMax - xMin) / xRes;
const yMaxIterations = (yMax - yMin) / yRes;


const graphFunction = (x, y) => {
  return x*x + y*y;
}


for(let x = 0; x < xMaxIterations; x++) {
  for(let y = 0; y < yMaxIterations; y++) {
    const xValue = xMin + xRes * x;
    const yValue = yMin + yRes * y;
    const graphValue = graphFunction(xValue, yValue);
    const color = gradientColor('#FFFF00', '#4500FF', -2, 2, graphValue);

    drawRectangle(x, y, 1, 1, color, true);
  }
}







