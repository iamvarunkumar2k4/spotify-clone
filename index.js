let play = document.getElementById('play');
let progressBar = document.getElementById('progressbar');
let audio = new Audio('./audio/1.mp3');
let nowImage=document.getElementsByClassName('now-image');
let nowtitle=document.getElementsByClassName('img-info');
let nowdesc=document.getElementsByClassName('img-desc');
let box=document.getElementsByClassName('left-main');


// MASTER PLAY BUTTON (add listener only once)
play.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
    box[0].classList.add('background-add');
    box[0].classList.remove('background-remove');
  } else {
    audio.pause();
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
    box[0].classList.remove('background-add');
    box[0].classList.add('background-remove');
  }
});

// UPDATE PROGRESS BAR
audio.addEventListener('timeupdate', () => {
  progressBar.value = 0;
  let progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  progressBar.style.background =
    `linear-gradient(to right,#1DB954 ${progress}%,#333 ${progress}%)`;
});


// SEEK AUDIO
progressBar.addEventListener('input', function () {
  audio.currentTime = (this.value * audio.duration) / 100;
});


// SONG LIST LOGIC
let playmusic = Array.from(document.getElementsByClassName('playMusic'));

function makeAllplay() {
  playmusic.forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
    element.closest('.music-card').style.backgroundColor = '#222020';
  });
}
function pausesong(){
  nowImage[0].src=`./image/default.webp`;
      nowtitle[0].textContent='Song Name';
      nowdesc[0].textContent='Artist Name';
      box[0].classList.remove('background-add');
      box[0].classList.add('background-remove');
}

function resumesong(){
  play.classList.remove('fa-play');
      play.classList.add('fa-pause');
      box[0].classList.add('background-add');
    box[0].classList.remove('background-remove');
}


playmusic.forEach((element) => {
  element.addEventListener('click', function () {

    const isPlaying = this.classList.contains('fa-circle-pause');
    const index = parseInt(this.id);
    makeAllplay();
    console.log(index);
    if (!isPlaying) {
      audio.src = `./audio/${index}.mp3`;
      audio.currentTime = 0;
      audio.play();

      resumesong();
      this.classList.remove('fa-circle-play');
      this.classList.add('fa-circle-pause');
      this.closest('.music-card').style.backgroundColor = '#1DB954';
      let newimage = this.closest('.music-card').querySelector('.music-card-image');
      nowImage[0].src=newimage.src;
      nowtitle[0].textContent=this.closest('.music-card').querySelector('.img-title').textContent;
      nowdesc[0].textContent=this.closest('.music-card').querySelector('.img-description').textContent;
    } 
    else {
      this.closest('.music-card').style.backgroundColor = '#222020';
      play.classList.remove('fa-pause');
      play.classList.add('fa-play');
      this.classList.remove('fa-circle-pause');
      this.classList.add('fa-circle-play');
      audio.pause();
      pausesong();
    }

  });
});
