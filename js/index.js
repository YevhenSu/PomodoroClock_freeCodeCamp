var app = angular.module('PomodoroApp', []);
app.controller('MainCtrl', function($scope, $interval) {
  $scope.breakLength = 5;
  $scope.sessionLength = 25;
  $scope.timeLeft = $scope.sessionLength;
  $scope.fillHeight = '0%';
  $scope.sessionName = 'Session';
  
  var runTimer = false;
  var seconds = 60 * $scope.timeLeft;
  $scope.originalTime = $scope.sessionLength;
  
  function timeTransform(value) {
    value = Number(value);
    var hour = Math.floor(value / 3600);
    var min = Math.floor(value % 3600 / 60);
    var sec = Math.floor(value % 3600 % 60);
    return ((hour > 0 ? hour + ":" + (min < 10 ? "0" : "") : "") + min + ":" + (sec < 10 ? "0" : "") + sec); 
  }
  
  $scope.sessionLengthChange = function(time) {
    if (!runTimer){
      if ($scope.sessionName === 'Session') {
        $scope.sessionLength += time;
        if ($scope.sessionLength < 1) {
          $scope.sessionLength = 1;
        }
        $scope.timeLeft = $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        seconds = 60 * $scope.sessionLength;
      }
    }
  }
  
  $scope.breakLengthChange = function(time) {
    if (!runTimer){
      $scope.breakLength += time;
      if ($scope.breakLength < 1) {
        $scope.breakLength = 1;
      }
      if ($scope.sessionName === 'Break!') {
        $scope.timeLeft = $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        seconds = 60 * $scope.breakLength;
      }
    }
  }
  
  $scope.toggleTimer = function() {
    if (!runTimer) {
      if ($scope.currentName === 'Sesson') {
        $scope.currentLength = $scope.sessionLength;
      } else {
        $scope.currentLength = $scope.breakLength;
      }
      
      updateTimer();
      runTimer = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(runTimer);
      runTimer = false;
    }
  }
  
  function updateTimer() {
    seconds -= 1;
    if (seconds < 0) {
      // countdown is finished
      
      // Play audio
      var sound = 'test-audio.mp3';
      var audio = new Audio(sound);
			audio.play();
      
      // toggle break and session
      $scope.fillColor = '#1a1a1a';
      if ($scope.sessionName === 'Break!') {
        $scope.sessionName = 'Session';
        $scope.currentLength = $scope.sessionLength;
        $scope.timeLeft = 60 * $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        seconds = 60 * $scope.sessionLength;
      } else {
        $scope.sessionName = 'Break!';
        $scope.currentLength = $scope.breakLength;
        $scope.timeLeft = 60 * $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        seconds = 60 * $scope.breakLength;
      }
    } else {
      if ($scope.sessionName === 'Break!') {
        $scope.fillColor = '#1011ed';
      } else {
        $scope.fillColor = '#73a';
      }
	    $scope.timeLeft = timeTransform(seconds);
      
      var denom = 60 * $scope.originalTime;
      var perc = Math.abs((seconds / denom) * 100 - 100);
      $scope.fillHeight = perc + '%';
    }
  }
  
});
