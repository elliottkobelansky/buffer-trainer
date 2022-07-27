let EDGEBUFFERORDER = ['UF', 'UB', 'UR', 'UL', 'FR', 'FL', 'DF', 'DB', 'DR', 'DL'];
let CORNERBUFFERORDER = ['UFR', 'UFL', 'UBR', 'UBL', 'DFR', 'DFL'];

let EDGEBUFFER = 'UF';
let CORNERBUFFER = 'UFR';

let EXCLUDEDEDGES = getExcludedEdges("UF");
let EXCLUDEDCORNERS = getExcludedCorners("UFR");

let bt = new bufferTrainer(EDGEBUFFER, CORNERBUFFER, EXCLUDEDEDGES, EXCLUDEDCORNERS);

let nextscram = bt.getScram();
let thisscram = "";
let lastscram = "";

function newBufferTrainer() {
    EXCLUDEDEDGES = getExcludedEdges(EDGEBUFFER);
    EXCLUDEDCORNERS = getExcludedCorners(CORNERBUFFER);
    bt = new bufferTrainer(EDGEBUFFER, CORNERBUFFER, EXCLUDEDEDGES, EXCLUDEDCORNERS);
    genScram();
    displayScram();
}

function getExcludedEdges(buffer) {
    if (buffer === "None") {
        return "All"
    }
    let bufferIndex = EDGEBUFFERORDER.indexOf(buffer);
    return EDGEBUFFERORDER.slice(0, bufferIndex);
}

function getExcludedCorners(buffer) {
    if (buffer === "None") {
        return "All"
    }
    let bufferIndex = CORNERBUFFERORDER.indexOf(buffer);
    return CORNERBUFFERORDER.slice(0, bufferIndex);
}

// Scramble generation. 
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
        event.preventDefault();
        displayScram();
    }
})

// Last scramble

document.getElementById("last").onclick = function () {
    lastScram();
};

// Selecting new buffer(s)
document.getElementById("edgebuffer").onchange = function () {
    document.getElementById("edgebuffer").blur();
    let e = document.getElementById("edgebuffer");
    let value = e.options[e.selectedIndex].value; 
    EDGEBUFFER = value;
    EXCLUDEDEDGES = getExcludedEdges(value);
    newBufferTrainer();
};

document.getElementById("cornerbuffer").onchange = function () {
    document.getElementById("cornerbuffer").blur();
    let e = document.getElementById('cornerbuffer');
    let value = e.options[e.selectedIndex].value;
    CORNERBUFFER = value;
    EXCLUDEDCORNERS = getExcludedCorners(value);
    newBufferTrainer();
};


// Change Buffer Order
new Sortable(edgebufferlist, {
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
});

new Sortable(cornerbufferlist, {
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
});

document.getElementById("confirm").onclick = function () {
    EDGEBUFFERORDER = Array.from(document.querySelectorAll("#edgebufferlist > li > a")).map(function (e) {return e.innerHTML;});
    CORNERBUFFERORDER = Array.from(document.querySelectorAll("#cornerbufferlist > li > a")).map(function (e) {return e.innerHTML;});

    let ebufferlist = Array.from(document.querySelectorAll("#edgebuffer > option"));
    for (let i = 0; i < EDGEBUFFERORDER.length - 1; i++) {
        ebufferlist[i + 1].innerHTML = EDGEBUFFERORDER[i];
        ebufferlist[i + 1].value = EDGEBUFFERORDER[i];
    }

    let cbufferlist = Array.from(document.querySelectorAll("#cornerbuffer > option"));
    for (let i = 0; i < CORNERBUFFERORDER.length - 1; i++) {
        cbufferlist[i + 1].innerHTML = CORNERBUFFERORDER[i];
        cbufferlist[i + 1].value = CORNERBUFFERORDER[i];
    }
    

    document.getElementById('edgebuffer').options[1].selected = true;
    document.getElementById('cornerbuffer').options[1].selected = true;

    let e = document.getElementById("edgebuffer");
    let value = e.options[e.selectedIndex].value; 
    EDGEBUFFER = value;
    EXCLUDEDEDGES = getExcludedEdges(value);

    let ea = document.getElementById('cornerbuffer');
    let valuea = ea.options[ea.selectedIndex].value;
    CORNERBUFFER = valuea;
    EXCLUDEDCORNERS = getExcludedCorners(valuea);

    newBufferTrainer();
}
