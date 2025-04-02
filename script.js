// // FAIT   Si la proposition est bien composée uniquement des 4 couleurs possibles et rien d’autre
// // FAIT   Une fonction qui retourne true ou false si la bonne combinaison est trouvée ou non
//     Une fonction qui gère la partie (continuer tant que/fin si gagné)
const affichageCouleur = document.querySelector("#colorPossible");
const inputText = document.querySelector("#inputText");
const buttonValider = document.querySelector("#valid");
const affichageIsValid = document.querySelector("#isValidate");

const colorChoose = ["bleu", "rouge", "vert", "gris"];

const correctAnswer = ["rouge", "vert"];
let essais = 0;
const devineColorArray = [];
affichageCouleur.innerHTML = `Les couleurs disponibles : ${colorChoose}`;

function devineColor(firstColor, secondColor) {
  const premiereCouleur = firstColor;
  const deuxiemeCouleur = secondColor;

  if (
    !colorChoose.includes(premiereCouleur) ||
    !colorChoose.includes(deuxiemeCouleur)
  ) {
    if (!colorChoose.includes(premiereCouleur)) {
      console.log(
        `Erreur : "${premiereCouleur}" n'est pas une couleur valide. Choisis parmi : ${colorChoose}`
      );
    }
    if (!colorChoose.includes(deuxiemeCouleur)) {
      console.log(
        `Erreur : "${deuxiemeCouleur}" n'est pas une couleur valide. Choisis parmi : ${colorChoose}`
      );
    }
    return;
  }

  essais++;
  console.log(`Essai n°${essais}`);

  if (!devineColorArray.includes(premiereCouleur)) {
    console.log(`Se trouve bien dans le tableau : ${premiereCouleur}`);
    devineColorArray.push(premiereCouleur);
  }
  if (!devineColorArray.includes(deuxiemeCouleur)) {
    console.log(`Se trouve bien dans le tableau : ${deuxiemeCouleur}`);
    devineColorArray.push(deuxiemeCouleur);
    didIWin(premiereCouleur, deuxiemeCouleur);
  }

  console.log("Couleurs devinées :", devineColorArray);
  console.log("Couleurs à deviner :", correctAnswer);
}

function didIWin(premiereCouleur, deuxiemeCouleur) {
  if (
    premiereCouleur === correctAnswer[0] &&
    deuxiemeCouleur === correctAnswer[1]
  ) {
    console.log("Gagné !");
  } else {
    console.log("Essaie encore...");
  }
}

buttonValider.addEventListener("click", () => {
  console.log(inputText.value);
  devineColor(firstColor, secondColor);
});

// devineColor("rouge", "vert");

// devineColor("violet", "noir");
