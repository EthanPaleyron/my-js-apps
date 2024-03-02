const video = document.querySelector("video");
const banner = document.querySelector("#banner");
const videoContent = document.querySelector("#videoContent");
const playPause = document.querySelector("#playPause");
const iconPlayPause = document.querySelector("#iconPlayPause");
const progressBar = document.querySelector("#progressBar");
const videoTime = document.querySelector("#videoTime");
const totalVideoTime = document.querySelector("#totalVideoTime");
let isPlaying = false;
let isMuted = false;
let tmpVolumeVideo = video.volume;
let tmpValueVolume = 50;

// Parametre de base sur la video
video.loop = true;
video.volume = 0.5;
video.disableRemotePlayback;
progressBar.value = 0;

// Convertisseur de temps
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

video.addEventListener("loadedmetadata", function () {
  // Temps total de la video
  progressBar.value = 0;
  const currentTimeTotal = formatTime(video.duration);
  totalVideoTime.textContent = currentTimeTotal;
});

video.addEventListener("timeupdate", () => {
  if (banner.style.display !== "none") {
    // Si la baniere est présente on la retire
    banner.style.display = "none";
  }
  // Temps actuel de la video
  const currentTime = formatTime(video.currentTime);
  videoTime.textContent = currentTime;
  // Avancement de la barre de progression par rapport au temps actuel de la video
  progressBar.value = (video.currentTime / video.duration) * 100;
});

// Mise à jour du temps de la video en fonction de la position de la barre de progression
progressBar.addEventListener("input", () => {
  const progress = parseFloat(progressBar.value);
  const newTime = (progress / 100) * video.duration;
  video.currentTime = newTime;
});

// Pouvoir mettre en route ou en pause la video
function playPauseVideo() {
  if (banner.style.display !== "none") {
    // Si la baniere est présente on la retire
    banner.style.display = "none";
  }
  if (isPlaying === false) {
    video.play();
    iconPlayPause.className = "fa-solid fa-pause";
    isPlaying = true;
  } else {
    video.pause();
    iconPlayPause.className = "fa-solid fa-play";
    isPlaying = false;
  }
}
banner.addEventListener("click", () => playPauseVideo());
video.addEventListener("click", () => playPauseVideo());
playPause.addEventListener("click", () => playPauseVideo());

// Regler le volume de la video
const volume = document.querySelector("#volume");
const volumeRange = document.querySelector("#volumeRange");
const iconVolume = document.querySelector("#iconVolume");
function volumeVideo() {
  if (isMuted === false) {
    tmpVolumeVideo = video.volume; // Enregistre la hauteur du song
    tmpValueVolume = volumeRange.value; // Enregistre la hauteur de la valeur de l'input
    video.volume = 0;
    volumeRange.value = 0;
    iconVolume.className = "fa-solid fa-volume-xmark";
    isMuted = true;
  } else {
    video.volume = tmpVolumeVideo;
    volumeRange.value = tmpValueVolume;
    iconVolume.className = "fa-solid fa-volume-high";
    isMuted = false;
  }
}

// Coupée ou remettre le song de la video
volume.addEventListener("click", () => volumeVideo());
function mutedVideo() {
  if (volumeRange.value / 0) {
    iconVolume.className = "fa-solid fa-volume-high";
    isMuted = false;
  } else if (volumeRange.value >= 0) {
    iconVolume.className = "fa-solid fa-volume-xmark";
    isMuted = true;
  }
}
volumeRange.addEventListener("input", () => {
  video.volume = volumeRange.value / 100;
  mutedVideo();
});

// Gerer la vitesse de la video
const speedVideo = document.querySelector("#speedVideo");
speedVideo.addEventListener("change", () => {
  video.playbackRate = speedVideo.value;
});

// Remetre la video a 0
document.querySelector("#restart").addEventListener("click", () => {
  video.currentTime = 0;
});

// Les racourcci clavier
document.addEventListener("keyup", (e) => {
  e.preventDefault();
  switch (e.code) {
    case "Space":
      playPauseVideo();
      break;
    case "ArrowLeft":
      video.currentTime -= 5;
      break;
    case "ArrowRight":
      video.currentTime += 5;
      break;
    case "ArrowUp":
      video.volume += 0.1;
      volumeRange.value = video.volume * 100;
      mutedVideo();
      break;
    case "ArrowDown":
      video.volume -= 0.1;
      volumeRange.value = video.volume * 100;
      mutedVideo();
      break;
    case "KeyR":
      video.currentTime = 0;
      break;
  }
});
