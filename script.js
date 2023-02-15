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
    "daykitchen": [["eggs", "320", "155"], ["pancakes", "210", "220"], ["bacon", "140", "150"]],
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
  var button_check = 0;
  var x = 0;
  
  //delay for animations (this was stolen off internet)
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  function reset() {
    play = false;
    background.style.opacity = 1;
    background.src = "img/backgrounds/start.png";
    delete_buttons();
    total = 0;
    x = 0;
  };
  function start() {
    if (play === false) {
      play = true;
      game(x);
    };
  };
  
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
  
  function button_creation(buttons) {
    for (const button of buttons) {
      const container = document.getElementById("container")
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
  
  function delete_buttons() {
    var elements = document.getElementsByClassName("game-elements")
    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  };
  
  async function button_detection(id) {
    if (id === "car" || id === "bus") {
      let multiplier = prompt("how long is your commute? (in miles)")
      total += multiplier * carbon[id]
    } else {
      total += carbon[id]
    };
    if (id === "hotwash" || id === "coldwash" || id === "machinedry" || id === "airdry") {
      button_check += 0.5
        if ( id === "hotwash" || id === "coldwash") {

        } else {

        };
    } else if (id === "garden" || id === "television" || id === "light" || id === "window") {
      delete_buttons();
      await img_transition(id, 100)
      button_check = 1;
    } else if (id === "run") {
      delete_buttons();
      await img_transition(id, 100);
      button_creation(scene["run"]);
    } else {
      button_check = 1;
    };
    if (button_check >= 1) {
        x+=1
        delete_buttons();
        button_check = 0;
      if (x > 5) {
        await img_transition("end", 100)
        g = document.createElement("p")
        g.className = "game-elements"
        g.style.position = "absolute";
        g.style.width = "50px";
        g.style.height = "50px";
        g.innerHTML = `${total.toString()}g CO2`;
        g.style.top = "180px";
        g.style.left = "240px";
        g.fontSize = "2em";
      } else {
        game(x);
      };
    };
  
  };
  
  
  async function game(x) {
    await img_transition(order[x], 50);
    await new Promise(resolve => { button_creation(scene[order[x]]); resolve; })
  };
  
