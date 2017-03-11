/**
 * AI算法
 */
// 赢法三维数组
var wins = [];

// 赢法的统计数组
var myWin = [];
var computerWin = [];

var count = 0;

var myScore = [];
var computerScore = [];
function howToWin() {
  for (var i = 0; i < 17; i ++) {
    wins[i] = [];
    for (var j = 0; j < 17; j ++) {
      wins[i][j] = [];
    }
  }
  // 横向赢法索引
  for (var l1 = 0; l1 < 17; l1 ++) {
    for (var m1 = 0; m1 < 13; m1 ++) {
      for (var n1 = 0; n1 < 5; n1 ++) {
        wins[l1][m1 + n1][count] = true;
      }
      count++;
    }
  }
  // 纵向赢法索引
  for (var l2 = 0; l2 < 17; l2 ++) {
    for (var m2 = 0; m2 < 13; m2 ++) {
      for (var n2 = 0; n2 < 5; n2 ++) {
        wins[m2 + n2][l2][count] = true;
      }
      count++;
    }
  }
  // 斜向赢法索引
  for (var l3 = 0; l3 < 13; l3 ++) {
    for (var m3 = 0; m3 < 13; m3 ++) {
      for (var n3 = 0; n3 < 5; n3 ++) {
        wins[l3 + n3][m3 + n3][count] = true;
      }
      count++;
    }
  }
  // 反斜向赢法索引
  for (var l4 = 0; l4 < 13; l4 ++) {
    for (var m4 = 16; m4 > 3; m4 --) {
      for (var n4 = 0; n4 < 5; n4 ++) {
        wins[l4 + n4][m4 - n4][count] = true;
      }
      count++;
    }
  }

  for (var x = 0; x < count; x ++) {
    myWin[x] = 0;
    computerWin[x] = 0;
  }
}


// AI下棋
function computerAI() {
  var max = 0;
  var u = 0, v = 0;
  var AIStep = [];
  for (var i = 0; i < 17; i ++) {
    myScore[i] = [];
    computerScore[i] = [];
    for (var j = 0; j < 17; j ++) {
      myScore[i][j] = 0;
      computerScore[i][j] = 0;
    }
  }
  for (var m = 0; m < 17; m ++) {
    for (var n = 0; n < 17; n ++) {
      if (chessBoard[m][n] == 0) {
        for (var k = 0; k < count; k ++) {
          if (wins[m][n][k]) {
            if (myWin[k] == 1) {
              myScore[m][n] += 200;
            } else if (myWin[k] == 2) {
              if (computerWin[k] != 0) {
                //死二
                myScore[m][n] += 290;
              } else {
                //活二
                myScore[m][n] += 400;
              }
            } else if (myWin[k] == 3) {
              if (computerWin[k] != 0) {
                //死三
                myScore[m][n] += 2000;
              } else {
                //活三
                myScore[m][n] += 4000;
              }
            } else if (myWin[k] == 4) {
              myScore[m][n] += 10000;
            }
            if (computerWin[k] == 1) {
              computerScore[m][n] += 220;
            } else if (computerWin[k] == 2) {
              if (myWin[k] != 0) {
                //死二
                computerScore[m][n] += 300;
              } else {
                //活二
                computerScore[m][n] += 420;
              }
            } else if (computerWin[k] == 3) {
              if (myWin[k] != 0) {
                //死三
                computerScore[m][n] += 2100;
              } else {
                //活三
                computerScore[m][n] += 4100;
              }
            } else if (computerWin[k] == 4) {
              computerScore[m][n] += 20000;
            }
          }
        }

        if (myScore[m][n] > max) {
          max = myScore[m][n];
          u = m;
          v = n;
        } else if (myScore[m][n] == max) {
          if (computerScore[m][n] > computerScore[u][v]) {
            u = m;
            v = n;
          }
        }

        if (computerScore[m][n] > max) {
          max = computerScore[m][n];
          u = m;
          v = n;
        } else if (computerScore[m][n] == max) {
          if (myScore[m][n] > myScore[u][v]) {
            u = m;
            v = n;
          }
        }

      }
    }
  }
  AIStep[0] = u;
  AIStep[1] = v;
  return AIStep;
}