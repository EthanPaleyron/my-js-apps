const audio = document.querySelector("audio");
const progressBar = document.querySelector("#progressBar");
const audioSrc = document.querySelector("#audioSrc");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const image = document.querySelector("#image");
const logoPlayPause = document.querySelector("#playPause > i");
let index = 0;
let isPause = true;
let isMuted = false;
let isLoop = false;

// Mes audios
const audios = [
  {
    src: "back-one-day.mp3",
    title: "Back One Day",
    author: "TheFatRat & NEFFEX",
    image: "back-one-day.jpg",
  },
  {
    src: "pegboard-nerds-self-destruct.mp3",
    title: "Monstercat",
    author: "Monstercat",
    image: "pegboard-nerds-self-destruct.jpg",
  },
  {
    src: "RESET.mp3",
    title: "RESET",
    author: "ELEPS",
    image: "RESET.jpg",
  },
];

audio.addEventListener("loadedmetadata", () => {
  // Temps total de l'audio
  progressBar.value = 0;
  const timeTotal = formatTime(audio.duration);
  document.querySelector("#timeTotal").textContent = timeTotal;
});

// l'audio video qui sera afficher en premier
audio.src = `../public/audio-player/${audios[index].src}`;
audioSrc.src = `../public/audio-player/${audios[index].src}`;
title.textContent = audios[index].title;
author.textContent = audios[index].author;
image.src = `../public/audio-player/${audios[index].image}`;
image.alt = audios[index].title;

// Changement de lecteur audio
function contentAudio() {
  // Met en pause l'audio si l'audio est en cours de lecture
  if (isPause === false) {
    audio.pause();
    isPause = true;
    logoPlayPause.className = "fa-solid fa-pause";
  }
  audio.src = `../public/audio-player/${audios[index].src}`;
  audioSrc.src = `../public/audio-player/${audios[index].src}`;
  title.textContent = audios[index].title;
  author.textContent = audios[index].author;
  image.src = `../public/audio-player/${audios[index].image}`;
  image.alt = audios[index].title;
  // Remet l'audio au début
  audio.currentTime = 0;
  audio.play();
  isPause = false;
  logoPlayPause.className = "fa-solid fa-pause";
}
document.querySelector("#next").addEventListener("click", () => {
  index++;
  if (index >= audios.length) {
    index = 0;
  }
  contentAudio();
});
// Si il est plus de 3 seconde ca remets a 0 l'audio sinon il revient a l'audio précédant
document.querySelector("#past").addEventListener("click", () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    index--;
    if (index < 0) {
      index = audios.length - 1;
    }
    contentAudio();
  }
});

// Mise en route ou en pause de l'audio
document.querySelector("#playPause").addEventListener("click", () => {
  if (isPause) {
    audio.play();
    logoPlayPause.className = "fa-solid fa-pause";
    document.querySelector("#playPause").title = "Pause";
    isPause = false;
  } else {
    audio.pause();
    logoPlayPause.className = "fa-solid fa-play";
    document.querySelector("#playPause").title = "Play";
    isPause = true;
  }
});

// Convertisseur de temps
function formatTime(s) {
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

audio.addEventListener("timeupdate", () => {
  // Temps de l'audio actuel
  const currentTime = formatTime(audio.currentTime);
  document.querySelector("#currentTime").textContent = currentTime;
  // Avancement de la barre de progression par rapport au temps actuel de l'audio
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  // Si c'est pas en autoplay ca passe au suivant
  if (audio.currentTime === audio.duration && isLoop == false) {
    index++;
    if (index >= audios.length) {
      index = 0;
    }
    contentAudio();
  }
});

// Mise à jour du temps de l'audio en fonction de la position de la barre de progression
progressBar.addEventListener("input", () => {
  const progress = parseFloat(progressBar.value);
  const newTime = (progress / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Réglage du volume de l'audio
const volume = document.querySelector("#volume");
const volumeRange = document.querySelector("#volumeRange");
const iconVolume = document.querySelector("#volume > i");
function volumeAudio() {
  if (isMuted === false) {
    audio.muted = true;
    iconVolume.className = "fa-solid fa-volume-xmark";
    volume.title = "Unmuted";
    isMuted = true;
  } else {
    audio.muted = false;
    iconVolume.className = "fa-solid fa-volume-high";
    volume.title = "Muted";
    isMuted = false;
  }
}

// Activer ou désactiver le mode muet de l'audio
volume.addEventListener("click", () => volumeAudio());
volumeRange.addEventListener("input", () => {
  audio.volume = volumeRange.value / 100;
  if (volumeRange.value / 0) {
    iconVolume.className = "fa-solid fa-volume-high";
    volume.title = "Muted";
    isMuted = false;
  } else if (volumeRange.value >= 0) {
    iconVolume.className = "fa-solid fa-volume-xmark";
    volume.title = "Unmuted";
    isMuted = true;
  }
});

// Activer ou désactiver le mode lire en boucle
const iconLoop = document.querySelector("#loop > i");
document.querySelector("#loop").addEventListener("click", () => {
  if (isLoop === false) {
    audio.loop = true;
    iconLoop.style.color = "#0075ff";
    document.querySelector("#loop").title = "Looped";
    isLoop = true;
  } else {
    audio.loop = false;
    iconLoop.style.color = "#000";
    document.querySelector("#loop").title = "Unlooped";
    isLoop = false;
  }
});
