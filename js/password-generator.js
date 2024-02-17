let characterCreation = [];
const similarCharacters = "oO01lI";
let characters = [];
const numbers = document.querySelector("#numbers");
const lowercase = document.querySelector("#lowercase");
const capital = document.querySelector("#capital");
const special = document.querySelector("#special");
const similar = document.querySelector("#similar");
const numberOfCharacters = document.querySelector("#numberOfCharacters");

const generatePasswords = document.querySelector("#generatePasswords");
const copy = document.querySelector("#copy");

document.querySelector("#generate").addEventListener("click", () => {
  characters = "";
  characterCreation = "";
  copy.style.color = "#000";
  if (numbers.checked == true) {
    for (let i = 0; i <= 9; i++) {
      characterCreation += i;
    }
  }
  if (lowercase.checked == true) {
    for (let i = 97; i <= 122; i++) {
      characterCreation += String.fromCharCode(i);
    }
  }
  if (capital.checked == true) {
    for (let i = 65; i <= 90; i++) {
      characterCreation += String.fromCharCode(i);
    }
  }
  if (similar.checked == true) {
    for (let i = 0; i < characterCreation.length; i++) {
      const character = characterCreation[i];
      if (!similarCharacters.includes(character)) {
        characters += character;
      }
    }
  } else {
    characters = characterCreation;
  }
  if (special.checked == true) {
    characters += "!@#$%^&*()-_=+[]{}|;:,.<>?";
  }
  console.log(characters);
  generatePasswords.value = "";
  for (let i = 0; i < numberOfCharacters.value; i++) {
    let randomNbr = Math.floor(Math.random(0) * characters.length);
    generatePasswords.value += characters[randomNbr];
  }
});

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(generatePasswords.value).then(() => {
    copy.style.color = "#eb0101";
  });
});
