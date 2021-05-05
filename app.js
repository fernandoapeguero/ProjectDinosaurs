const dinos = [];
// Create Dino Constructor
class Dino {
  constructor(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

// Create Dino Objects
const fetchDinos = async () => {
  const res = await fetch("./dino.json");

  const data = await res.json();
  for (const dino of data.Dinos) {
    dinos.push(
      new Dino(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      )
    );
  }
};

class Human {
  constructor(name, feet, inches, weight, diet) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.weight = weight;
    this.diet = diet;
  }
}

let human = null;

document.querySelector("#btn").addEventListener("click", async (e) => {
  e.preventDefault();

  human = (function () {
    const form = new FormData(document.querySelector("#dino-compare"));
    if (
      form.get("name") === "" ||
      form.get("feet") === "" ||
      form.get("inches") === "" ||
      form.get("weight") === "" ||
      form.get("diet") === ""
    )
    return false;

    return new Human(
      form.get("name"),
      form.get("feet"),
      form.get("inches"),
      form.get("weight"),
      form.get("diet")
    );
  })();

  if(dinos.length === 0) await fetchDinos();
  if (human) addTilesToDom()
});


// methods to compare dinos to human weight, size and diet
const compareDinoOne = (dino) => {
  if (human.weight < dino.weight) {
    return `${dino.species} is ${Math.floor(
      dino.weight / human.weight
    )} times heavier than you.`;
  }

  return `${dino.species} is ${Math.floor(
    human.weight / dino.weight
  )} ligther than you.`;
};

const compareDinoTwo = (dino) => {
  if (human.feet < dino.height) {
    return `${dino.species} is ${Math.floor(
      dino.height / human.feet
    )} times bigger than you.`;
  }

  const feets = human.feet / dino.height;

  return `${dino.species} is ${
    feets < 1
      ? "is About you size"
      : Math.floor(feets) + " times bigger than you."
  } `;
};

const compareDinoThree = (dino) => {
        
      if (dino.diet === human.diet){
        return `${dino.species} has the same diet as some humans`;
      } 
      
      return `They have a different diet than human do.`
};

const compareFuns = [compareDinoOne, compareDinoTwo, compareDinoThree];


// add tiles to dom grid from arrays 
const addTilesToDom = () => {

  const grid = document.querySelector("#grid");
  
  grid.innerHTML = "";

  for (const dino of dinos) {
    let match = false;

    if (dino.diet === human.diet.toLowerCase()) {
      match = true;
    }

    const div = document.createElement("div");
    div.setAttribute("class", "grid-item");
    div.innerHTML = `
            <h3>${dino.species}</h3>
            <p>${
              match
                ? compareFuns[Math.floor(Math.random() * 1 + Math.random() * 2)](dino)
                : dino.fact
            }</p>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${
      dino.species
    }" />`;

    match = false;
    grid.appendChild(div);
  }
  count = 0;

  grid.insertBefore(addHumanGridItem(), grid.children[4]);

  hideForm();
};


// return human dom element
function addHumanGridItem() {
  const div = document.createElement("div");
  div.setAttribute("class", "grid-item");

  div.innerHTML = `
        <h3>${human.name}</h3>
        <p>${
          human.diet === "Omnivor" ? "yeah that's me who can eat anything." : ""
        }</p>
        <img src="images/human.png" alt="human" />`;

  return div;
}


// hides the form 
function hideForm(){
  
  const form = document.querySelector("#dino-compare").style.display = "none";
}