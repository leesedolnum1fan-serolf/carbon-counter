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
//buttons that correspond with a scene
const scene = {
    "darkroom": [["light",], ["window"]],
    "daykitchen": [["eggs"], ["pancakes"], ["bacon"]],
    "transportation": [["bike"], ["walk"], ["car"], ["bus"]],
    "home": [["television"], ["run"], ["garden"]],
    "workout":[["normrun"], ["treadrun"]],
    "nightkitchen": [["salad"], ["steak"], ["pizza"]]
};
// total carbon tracker
var total = 0;
//game state
var play = false;

window.onload;
const container = document.getElementById("container")
function reset() {
    play = false;
};
function start() {
    if (play === false) {
        play = true;
        game();
    };
};

function game() {
    
};
