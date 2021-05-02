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

const dinos = [];
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

fetchDinos();

// Create Human Object
class Human {
  constructor(name, feet, inches, weight, diet) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.weight = weight;
    this.diet = diet;
  }
}

// Use IIFE to get human data from form

const getformData = function () {
    const form = new FormData(document.querySelector("#dino-compare"));
    if (
        form.get("name") === "" ||
        form.get("feet") !== "" ||
        form.get("inches") === "" ||
        form.get("weight") === "" ||
        form.get("diet") === ""
    )
        return;

    return new Human(
        form.get("name"),
        form.get("feet"),
        form.get("inches"),
        form.get("weight"),
        form.get("diet")
    );  
};  

let human = null;

document.querySelector("#btn").addEventListener("click", (e) => {
    e.preventDefault();

    human = getformData();
    if (!human) return;
    addTilesToDom();
});
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM
const addTilesToDom = () => {
    const grid = document.querySelector("#grid");

    grid.innerHTML = "";

    for (const dino of dinos) {

        const div = document.createElement('div',);
        div.setAttribute('class', 'grid-item');
        div.innerHTML = `
            <h3>${dino.species}</h3>
            <p>${dino.fact}</p>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species}" />`;
        
        grid.appendChild(div)     
    }

    grid.insertBefore(addHumanGridItem(), grid.children[4])
};


function addHumanGridItem() {


    const div = document.createElement("div");
    div.setAttribute("class", "grid-item");

    div.innerHTML = `
        <h3>${human.name}</h3>
        <img src="images/human.png" alt="human" />`;
    
    return div;

}
// Remove form from screen

// On button click, prepare and display infographic
