let bt = new bufferTrainer("UF");

let nextscram = bt.getScram();
let thisscram = "";
let lastscram = "";

// Scramble generation. This can be improved by caching.
function genScram() {
    thisscram = nextscram;
    nextscram = bt.getScram();
}

function displayScram() {
    lastscram = thisscram;
    document.getElementById("scramble").innerHTML = nextscram;
    genScram();
}

function lastScram() {
    document.getElementById("scramble").innerHTML = lastscram;
}


// Next scramble on space bar
document.getElementById("next").onclick = function () {
    displayScram();
};
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        displayScram();
    }
})

// Last scramble

document.getElementById("last").onclick = function () {
    lastScram();
};

// Selecting new buffer(s)
let EDGEBUFFER = "UF"
let CORNERBUFFER = "None"

document.getElementById("edgebuffer").onchange = function () {
    document.getElementById("edgebuffer").blur();
    let e = document.getElementById("edgebuffer");
    let value = e.options[e.selectedIndex].value; 
    bt = new bufferTrainer(value);
    genScram();
    displayScram();
};

document.getElementById("cornerbuffer").onchange = function () {
    document.getElementById("cornerbuffer").blur();
};
