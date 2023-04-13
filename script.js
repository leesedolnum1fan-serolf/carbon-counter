//defines values of each option for total carbon score
const carbon = {
  "light": 300,
  "window": 0,
  "bike": 0,
  "walk": 0,
  "car": 411,
  "bus": 100,
  "hotwash": 220,
  "coldwash": 22,
  "machinedry": 1800,
  "airdry": 0,
  "eggs": 259.2,
  "pancakes": 113.9,
  "bacon": 329.5,
  "steak": 3134,
  "salad": 910,
  "pizza": 1380,
  "television": 75,
  "garden": 0,
  "treadrun": 47,
  "normrun": 0
};
//scenes in order
const order = ["darkroom", "daykitchen", "transportation", "home", "laundry", "nightkitchen"];
//buttons that correspond with a scene
const scene = {
  "darkroom": [["light", "6", "120"], ["window", "320", "51"]],
  "daykitchen": [["eggs", "320", "155"], ["pancakes", "210", "220"], ["bacon", "130", "140"]],
  "transportation": [["bike", "140", "40"], ["walk", "320", "40"], ["car", "270", "180"], ["bus", "80", "150"]],
  "home": [["television", "150", "160"], ["run", "310", "160"], ["garden", "230", "65"]],
  "run": [["normrun", "140", "80"], ["treadrun", "270", "80"]],
  "laundry": [["hotwash", "10", "70"], ["coldwash", "140", "70"], ["machinedry", "10", "180"], ["airdry", "140", "180"]],
  "nightkitchen": [["pizza", "110", "160"], ["steak", "330", "160"], ["salad", "230", "230"]]
};
// total carbon tracker
var total = 0;
//game state
var play = false;
//so it knows when user clicks button
var button_check = 0;
//for cycling through scenes
var x = 0;

//delay for animations (this was stolen off internet)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

//clears everything
function reset() {
  play = false;
  background.style.opacity = 1;
  background.src = "img/backgrounds/start.png";
  delete_buttons();
  total = 0;
  x = 0;
};
//starts first scene
function start() {
  if (play === false) {
    play = true;
    game(x);
  };
};

//fade animition through scenes
async function img_transition(new_img, ms) {
  const background = document.getElementById("background");
  let i = 1;
  for (i; i > 0; i -= 0.1) {
    await delay(ms).then(() => { background.style.opacity = i; });
  }
  background.src = "img/backgrounds/" + new_img + ".png";
  for (i; i < 1; i += 0.1) {
    await delay(ms).then(() => { background.style.opacity = i; });
  };
};

//create button for given scene
function element_creation(stage) {
  const container = document.getElementById("container")
  var g = document.createElement("img");
  g.className = "game-elements";
  g.src = "img/dialogue/"+stage+".png"
  container.appendChild(g)
  g.style.position = "absolute";
  g.style.left = "22px";
  g.style.top = "255px"
  for (const button of scene[stage]) {
    var g = document.createElement("button");
    var item = button[0];
    g.id = item;
    g.className = "game-elements";
    g.style.backgroundColor = "transparent";
    g.style.borderColor = "transparent";
    g.innerHTML = `<img src="img/buttons/${item}.png">`;
    g.style.position = "absolute";
    g.style.left = button[1] + "px";
    g.style.top = button[2] + "px"
    container.appendChild(g);
    g.onclick = function() { button_detection(this.id); };
  };
};

//clears all game-elements
function delete_buttons() {
  var elements = document.getElementsByClassName("game-elements")
  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

//for when a button is clicked
async function button_detection(id) {
  if (id === "car" || id === "bus") {
    let multiplier = prompt("how long is your commute? (in miles)")
    total += multiplier * carbon[id]
  } else if (id !== "run") {
    total += carbon[id]
  };
  if (id === "hotwash" || id === "coldwash" || id === "machinedry" || id === "airdry") {
    button_check += 0.5
    if (id === "hotwash" || id === "coldwash") {
      document.getElementById("hotwash").remove()
      document.getElementById("coldwash").remove()
    } else {
      document.getElementById("airdry").remove()
      document.getElementById("machinedry").remove()
    };
  } else if (id === "garden" || id === "television" || id === "light" || id === "window") {
    delete_buttons();
    await img_transition(id, 100)
    button_check = 1;
  } else if (id === "run") {
    delete_buttons();
    await img_transition(id, 100);
    element_creation("run");
  } else {
    button_check = 1;
  };
  if (button_check >= 1) {
    x += 1
    delete_buttons();
    button_check = 0;
    //for end scene
    if (x > 5) {
      await img_transition("end", 100)
      var g = document.createElement("p")
      g.className = "game-elements";
      g.style.position = "absolute";
      g.style.width = "80px";
      g.style.height = "50px";
      g.innerHTML = `${total.toString()}g CO2`;
      g.style.top = "200px";
      g.style.left = "200px";
      g.style.fontSize = "2em";
      g.style.fontFamily = '"Brush Script MT", Cursive';
      g.style.color = "magenta";
      container.appendChild(g);
    } else {
      game(x);
    };
  };
};
//create scene
async function game(x) {
  await img_transition(order[x], 50);
  await new Promise(resolve => { element_creation(order[x]); resolve; })
};
