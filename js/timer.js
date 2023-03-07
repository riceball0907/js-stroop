import { domElements } from './dom-elements.js';
import { endTest, timerId } from './stroop.js'

// 起始時間(計時器的啟動時間)。
//const startTime = new Date().getTime();

// 目標時間(要倒數幾秒)。
const targetSeconds = 180;

// 初始化。
init(targetSeconds);

// timer.
function timer(startTime) {
  // 當前時間。
  var currentTime = new Date().getTime();
  
  // 當前時間 - 起始時間 = 經過時間。(因為不需要毫秒，所以將結果除以1000。)
  var diffSec = Math.round((currentTime - startTime) / 1000);
  
  // 目標時間 - 經過時間 = 剩餘時間。
  var remainingTime = targetSeconds - diffSec;
  
  // update progess.  
  textRenderer(remainingTime);   
  
  if (remainingTime == 0) {
    // stop the timer.
    clearInterval(timerId);
    
    // do anything you want to.
    endTest();
  } 
}

// start the timer.
export function startTimer(startTime){
  var timerId = setInterval( function () { timer(startTime); }, 1000);
  return timerId;
}


// 初始化。此處借用update函式來初次設定進度條。
function init(seconds) {
  textRenderer(seconds);
}

// refresh the text of the bar.
function textRenderer (seconds) {
  var sec = seconds % 60;  
  var min = Math.floor(seconds / 60); 

  /* 兩種作法都可以 */
  //min = min > 9 ? min : "0" + min;
  //sec = sec > 9 ? sec : "0" + sec;  
  min = min.toString().padStart(2, '0');
  sec = sec.toString().padStart(2, '0');
  
  document.getElementById('timer').innerHTML = min + ":" + sec;
}