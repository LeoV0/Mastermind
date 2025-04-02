const affichageCouleur = document.querySelector("#colorPossible");
const inputText = document.querySelector("#inputText");
const buttonValider = document.querySelector("#valid");
const affichageIsValid = document.querySelector("#isValidate");
const buttonRejouer = document.querySelector("#replayButton");
const nombreEssais = document.querySelector("#essais");
const messageErreur = document.querySelector("#errorMessage");

const colorChoose = [
  "bleu",
  "rouge",
  "vert",
  "gris",
  "jaune",
  "violet",
  "orange",
  "noir",
];
// const correctAnswer
function shuffle(colorChoose) {
  colorChoose.sort(() => Math.random() - 0.5);
}
shuffle(colorChoose);
let essais = 0;

affichageCouleur.innerHTML = `Les couleurs disponibles : ${colorChoose}`;

function estPropositionValide(colors) {
  if (colors.length !== correctAnswer.length) {
    messageErreur.innerHTML = `Veuillez entrer exactement ${correctAnswer.length} couleurs séparées par des espaces.`;
    return false;
  }

  for (let color of colors) {
    if (!colorChoose.includes(color)) {
      messageErreur.innerHTML = `"${color}" n'est pas une couleur valide. Choisis parmi : ${colorChoose}`;
      return false;
    }
  }

  const uniqueColors = new Set(colors);
  if (uniqueColors.size !== correctAnswer.length) {
    messageErreur.innerHTML = `Les ${correctAnswer.length} couleurs doivent être différentes.`;
    return false;
  }

  messageErreur.innerHTML = "";
  return true;
}

function didIWin(proposition) {
  // Vérifie si toutes les positions correspondent
  let isWin = true;
  for (let i = 0; i < correctAnswer.length; i++) {
    if (proposition[i] !== correctAnswer[i]) {
      isWin = false;
      break;
    }
  }

  if (isWin) {
    return true;
  } else {
    let bienPlacees = 0;
    let malPlacees = 0;

    // Couleurs bien placées
    for (let i = 0; i < correctAnswer.length; i++) {
      if (proposition[i] === correctAnswer[i]) {
        bienPlacees++;
      }
    }

    // Couleurs mal placées
    const correctCopy = [...correctAnswer];
    const propCopy = [...proposition];
    for (let i = 0; i < correctAnswer.length; i++) {
      if (propCopy[i] === correctCopy[i]) {
        propCopy[i] = null;
        correctCopy[i] = null;
      }
    }
    for (let i = 0; i < correctAnswer.length; i++) {
      if (propCopy[i] && correctCopy.includes(propCopy[i])) {
        malPlacees++;
        const index = correctCopy.indexOf(propCopy[i]);
        correctCopy[index] = null;
      }
    }

    affichageIsValid.innerHTML = `Résultat : ${bienPlacees} bien placée(s), ${malPlacees} mal placée(s)`;
    return false;
  }
}

function devineColor(proposition) {
  if (!estPropositionValide(proposition)) {
    return;
  }

  essais++;
  nombreEssais.textContent = `Ton nombre d'essai(s) : ${essais}`;

  if (didIWin(proposition)) {
    affichageIsValid.innerHTML = `Gagné ! en ${essais} essai(s)`;
    buttonValider.style.display = "none";
    buttonRejouer.style.display = "inline-block";
  } else if (essais >= 12) {
    affichageIsValid.innerHTML = "Perdu ! Tu as utilisé tes 12 essais.";
    buttonValider.style.display = "none";
    buttonRejouer.style.display = "inline-block";
  }
}

buttonValider.addEventListener("click", () => {
  const inputValue = inputText.value.trim();
  const colors = inputValue.split(" ");

  if (colors.length === correctAnswer.length) {
    devineColor(colors);
  } else {
    affichageIsValid.innerHTML = "";
    messageErreur.innerHTML = `Veuillez entrer exactement ${correctAnswer.length} couleurs séparées par des espaces.`;
  }
});

buttonRejouer.addEventListener("click", () => {
  inputText.value = "";
  buttonRejouer.style.display = "none";
  buttonValider.style.display = "inline-block";
  affichageIsValid.innerHTML = "";
  messageErreur.innerHTML = "";
  nombreEssais.textContent = "Ton nombre d'essai(s) : 0";
  essais = 0;
});
