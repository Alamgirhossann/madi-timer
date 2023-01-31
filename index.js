// const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
    fakeDuration % 60
  )}`;
  
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
    //   song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(video);
    });
  });
  
  play.addEventListener("click", function() {
    checkPlaying(video);
  });
  
  replay.addEventListener("click", function() {
      restartSong(video);
      
    });
  
  
  const restartSong = video =>{
      let currentTime = song.currentTime;
      song.currentTime = 0;
      console.log("ciao")
  
  }
  
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
  
  const checkPlaying = video => {
    if (video.paused) {
    //   song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
    //   song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
  
  video.ontimeupdate = function() {
    let currentTime = video.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
  
    if (currentTime >= fakeDuration) {
    //   song.pause();
      video.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };