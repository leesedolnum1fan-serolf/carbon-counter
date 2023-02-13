//defines values of each option for total carbon score
const values = {
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
const order = ["darkroom", "daykitchen", "transportation", "home", "nightkitchen"];
//buttons that correspond with a scene
const scene = {
    "darkroom": [["light",], ["window"]],
    "daykitchen": [["eggs"], ["pancakes"], ["bacon"]],
    "transportation": [["bike"], ["walk"], ["car"], ["bus"]],
    "home": [["television"], ["run"], ["garden"]],
    "workout":[["normrun", 100, 200], ["treadrun"]],
    "nightkitchen": [["salad"], ["steak"], ["pizza"]]
};
// total carbon tracker
var total = 0;
//game state
var play = false;

//delay for animations (this was stolen off internet)
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};

function reset() {
    play = false;
    background.style.opacity = 1;
    background.src = "img/backgrounds/start.png"
};
function start() {
    if (play === false) {
        play = true;
        game();
    };
};

function img_transition(new_img) {
    const background = document.getElementById("background");
    let i = 1;
    for (i; i > 0; i-=0.1) {
        delay(1000).then(() => {background.style.opacity = i;});
    }
    background.src = "img/backgrounds/"+new_img+".png";
    for (i; i < 1; i+=0.1) {
        delay(1000).then(() => {background.style.opacity = i;});    };
};

function button_creation(buttons) {
    for (const thing in buttons) {
        console.log(buttons[thing])
         var g = document.createElement("button");
         var item = buttons[thing][0];
         g.id = item;
         g.className = "game-elements";
         g.style.backgroundImage = "img/buttons/"+item+".png"
         g.style.position = "absolute";
         console.log(g);
    };
};

function butten_detection() {

};


function game() {
    for (const item of order) {
        delay(1000).then(img_transition(item));
    };
};
