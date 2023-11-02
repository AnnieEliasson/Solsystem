const planets = document.querySelectorAll(".planet");
const infoPage = document.getElementById("infoPage");
const backButton = document.getElementById("back-button");
const planetName = document.getElementById("planetName");
const latinName = document.getElementById("latinName");
const information = document.getElementById("information");
const circum = document.getElementById("circum");
const fromSun = document.getElementById("fromSun");
const maxTmp = document.getElementById("maxTmp");
const minTmp = document.getElementById("minTmp");
const moons = document.getElementById("moons");
const url = "https://majazocom.github.io/Data/solaris.json";

//skapar en array med namnen på planeterna
const planetArray = []
planets.forEach(planet => {
  planetArray.push(planet.classList[1])
});

// Klick event på planeterna
planets.forEach((planet) => {
  planet.addEventListener("click", (e) => {
      getInfo(planetArray.indexOf(e.target.classList[1]))
  });
});

// Hämtar info från APIn
function getInfo(index) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let planet = data[index];
      placeInfo(planet);
    });
}

// placerar info i rätt element
function placeInfo(planet) {
  infoPage.style.display = "flex";
  planetName.innerText = planet.name;
  latinName.innerText = planet.latinName;
  information.innerText = planet.desc;
  circum.innerText = `${planet.circumference.toLocaleString()} km`;
  fromSun.innerText = `${planet.distance.toLocaleString()} km`;
  maxTmp.innerText = `${planet.temp.day}C`;
  minTmp.innerText = `${planet.temp.night}C`;

  moons.innerText = "- ";
  planet.moons.forEach((moonItem) => {
    let moon = document.createElement("span");
    moon.innerHTML = `${moonItem} - `;
    moons.append(moon);
  });
}

//tillbaka knapp
backButton.addEventListener("click", function () {
  infoPage.style.display = "none";
});

//stjärnskapare
function addStars(stars){

  for(let i = 0; i < stars; i++){
    let star = document.createElement('div')
    star.classList.add('star')
    star.style.left = `${getRandomNumber(150, 4000)}px`
    star.style.top = `${getRandomNumber(1, 2000)}px`
    star.style.opacity = `.${getRandomNumber(1, 9)}`
    infoPage.append(star)
  }
}

addStars(300)

// funktion för random nummer mellan två tal
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
