/**
 * 界面绘制
 */
var chess = document.getElementById('chess');
var context = chess.getContext('2d');

var _canvasBuffer = document.createElement('canvas');
_canvasBuffer.width = chess.width;
_canvasBuffer.height = chess.height;
var _canvasBufferContext = _canvasBuffer.getContext('2d');

var chessBoard = [];
var color = true;
var over = false;
window.onload = function () {

  var newGameBtn = document.getElementById('newGame');
  newGameBtn.addEventListener('click', function () {
    window.location.reload(false);
  })

  // 保存每点落子情况，0为未落子
  for (var i = 0; i < 17; i ++) {
    chessBoard[i] = [];
    for (var j = 0; j < 17; j ++) {
      chessBoard[i][j] = 0;
    }
  }

  drawBoard();
  howToWin();

  // 绘制水印
  function drawBoard() {
    var logo = new Image();
    logo.src = './images/background.png';
    logo.onload = function () {
      _canvasBufferContext.drawImage(logo, 0, 0, 510, 510);
      drawChessBoard();
    }
  }

  // 绘制棋盘
  function drawChessBoard() {
    _canvasBufferContext.strokeStyle = '#aaaaaa';
    for (var i = 0; i <= 16; i ++) {
      // 横线
      _canvasBufferContext.moveTo(15 + i * 30, 15);
      _canvasBufferContext.lineTo(15 + i * 30, 495);
      _canvasBufferContext.stroke();
      // 纵线
      _canvasBufferContext.moveTo(15, 15 + i * 30);
      _canvasBufferContext.lineTo(495, 15 + i * 30);
      _canvasBufferContext.stroke();
    }
    context.drawImage(_canvasBuffer, 0, 0, 510, 510);
  }

  // 绘制棋子
  function drawChess(i, j, color) {
    _canvasBufferContext.beginPath();
    _canvasBufferContext.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    _canvasBufferContext.closePath();
    var gradient = _canvasBufferContext.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    // color为true代表白子，false代表黑子
    if (color) {
      gradient.addColorStop(0, '#d1d1d1');
      gradient.addColorStop(1, '#f9f9f9');
    } else {
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#666666');
    }
    _canvasBufferContext.fillStyle = gradient;
    _canvasBufferContext.fill();
    context.drawImage(_canvasBuffer, 0, 0, 510, 510);
  }



  // 点击落子事件
  chess.addEventListener('click', function (e) {
    if (over) {
      return;
    }
    if (!color) {
      return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessBoard[i][j] === 0) {
      drawChess(i, j, color);
      if (color) {
        // 白为1
        chessBoard[i][j] = 1;
      } else {
        // 黑为2
        chessBoard[i][j] = 2;
      }
      for (var ii = 0; ii < count; ii++) {
        if (chessBoard[i][j] == 1) {
          if (wins[i][j][ii]) {
            myWin[ii] ++;
            computerWin[ii] = 6;
            if (myWin[ii] == 5) {
              setTimeout("window.alert('白子获胜')", 0);
              over = true;
              return;
            }
          }
        } else if (chessBoard[i][j] == 2) {
          if (wins[i][j][ii]) {
            myWin[ii] ++;
            // computerWin[ii] = 6;
            if (myWin[ii] == 5) {
              setTimeout("window.alert('黑子获胜')", 0);
              over = true;
              return;
            }
          }
        }
      }
      if (!over) {
        color = !color;
        var AIStep = computerAI();
        var u = AIStep[0];
        var v = AIStep[1];
        // console.log(computerAI());
        drawChess(u, v, color);
        chessBoard[u][v] = 2;
        for (var k =0; k < count; k ++) {
          if (wins[u][v][k]) {
            computerWin[k] ++;
            // myWin[k] = 6;
            if (computerWin[k] == 5) {
              setTimeout("window.alert('黑子获胜')", 0);
              over = true;
              return;
            }
          }
        }
        if (!over) {
          color = !color;
        }
      }
    }
  })

};

