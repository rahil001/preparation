/**
 * Created by rahil on 7/8/17.
 */

/*(function () {

    var startButton = document.querySelector('[data-action="start"]');
    var stopButton = document.querySelector('[data-action="stop"]');
    var resetButton = document.querySelector('[data-action="reset"]');
    var minutes = document.querySelector('.minutes');
    var seconds = document.querySelector('.seconds');

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    var timerTime = 0;
    var interval;
    var isRunning =false;

    function startTimer() {
        if(isRunning)
            return;
        isRunning = true;
        interval = setInterval(incrementTimer, 1000);
    }

    function stopTimer() {
        if(!isRunning)
            return;
        isRunning = false;
        clearInterval(interval);
    }


    function resetTimer() {
        stopTimer();
        isRunning =false;
        timerTime=0;
        seconds.innerText = '00';
        minutes.innerText = '00';
    }

    function pad(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function incrementTimer() {
        timerTime++;
        var numOfmin = Math.floor(timerTime / 60);
        var numOfsec = timerTime % 60;
        seconds.innerText = pad(numOfsec);
        minutes.innerText = pad(numOfmin);
    }

})();*/


(function() {

    var startButton = document.querySelector('[data-action="start"]');
    var stopButton = document.querySelector('[data-action="stop"]');
    var resetButton = document.querySelector('[data-action="reset"]');
    var minutes = document.querySelector('.minutes');
    var seconds = document.querySelector('.seconds');

    startButton.addEventListener('click', start);
    stopButton.addEventListener('click', stop);
    resetButton.addEventListener('click', reset);

    var isRunning = false;
    var startTime = 0;
    var interval;

    function stop(){
        if(!isRunning){
            return;
        }
        isRunning = false;
        clearInterval(interval);
    }

    function reset(){
        stop();
        isRunning = false;
        minutes.innerText = '00';
        seconds.innerText = '00';
        startTime=0;
        return;
    }

    function start(){
        if(isRunning){
            return;
        }
        isRunning = true;
        interval = setInterval(increment, 1000);
    }

    function increment(){
        startTime++;
        padding(startTime);

    }

    function padding(time){

        var min = Math.floor(time / 60);
        var sec = time % 60;
        seconds.innerText = sec > 10 ? sec : '0' + sec;
        minutes.innerText = min > 10 ? min : '0' + min;

    }

})();

function xyz() {
  return 1;
}
var x =  new xyz();


function spacify(str) {
  var x = '';
  for (var i = 0; i < str.length; i++) {
    if(str[i] !== ' ' && i < str.length - 1){
      x = x + str[i] + '';
    }
  }
  return x;
}

function A(...args) {
  this.a = args
}

function A(args) {
  return function newInstance(...args) {
    return args;
  }
}

var le = new LazyEval([1, 2, 3, 4, 5])
  .filter(i => i > 2)
  .map(i => i * 2);
le.value(); // [6, 8, 10]

function LazyEval(...args) {
  this.filter = function() {

  }
}


function debounce(fn , delay) {
  var timer;
  return function() {
    var self = this;
    timer = setTimeout(function() {
      fn.apply(self, arguments)
    }, delay)
  }
}

var deb = debounce(function() {
  console.log('resizing');
}, 1500);

window.addEventListener('resize', deb);

function throttle(fn, delay) {
  var oldTime = new Date();
  return function() {
    var newTime = new Date();
    var self = this;
    if(newTime - oldTime > delay){
      fn.apply(self, arguments);
    }
  }
}
