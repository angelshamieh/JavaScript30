//** get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
const ranges = player.querySelector('.player__slider');

//** build the fns
 function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
 }

// we create new fn for the button change because we can pause a video in another way, not only toggle o video.
function updateButton() {
  // when & which icon should be
  const icon = this.paused ? '►' : '❚ ❚';
  // to replace this icon as text in the toggle class. (where we should put this)
  toggle.textContent = icon;
}

function skip() {
  // without parseFloat it's a string
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  // update the orange bar for the video time progress
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  //e.offsetX = the currentpint on the bar
  // progress.offsetWidth = the entire width of the bar)
  const scrubTime = (e.offsetX  / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime;
}



 ///** event listners
 video.addEventListener('click', togglePlay);
 video.addEventListener('play', updateButton);
 video.addEventListener('pause', updateButton);
 // checking when the time in the video is changes and run this fn.
 video.addEventListener('timeupdate', handleProgress);

 toggle.addEventListener('click', togglePlay);

 skipButtons.forEach(button => button.addEventListener('click', skip));

 ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
 ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
 //moving the bar time
 let mousedown = false;
progress.addEventListener('click', scrub);
// because scrub is needing the e we need to pass it to this fn.
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


