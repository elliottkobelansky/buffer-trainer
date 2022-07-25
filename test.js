const UF = require('./ufSetups.json');
const Cube = require('cubejs');

Cube.initSolver();

PIECES = ["UB", "UR", "UL", "DF", "DB", "FR", "FL", "DR", "DL", "BR", "BL"]

function randIndex(list) {
    let index = Math.floor(Math.random()*list.length);
    return index;
}

function randBool() {
    return Math.random() < 0.5;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function evenize(int) {
    return int - (int % 2)
}

class bufferTrainer {
    constructor(buffer) {
        this.pieces = PIECES.slice(PIECES.indexOf(buffer) + 1);
        console.log(this.pieces);
    }
    genRandomTargets() {
        this.targets = []
        let availablePieces = Array.from(this.pieces) 
        for (let i = 0; i < evenize(this.pieces.length); i++) {
            let r = randIndex(availablePieces);
            let randPiece = availablePieces.splice(r, 1)[0];
            
            if (randBool()) {
                randPiece = reverseString(randPiece);
            }

            this.targets.push(randPiece);
        }
        return
    }
    getScram() {
        this.genRandomTargets()
        let algs = []
        for (let i = 0; i < this.targets.length / 2; i++) {
            let firstTarget = this.targets[i * 2];
            let secondTarget = this.targets[i * 2 + 1];
            algs.push(UF[firstTarget][secondTarget]);
        }
        const cube = new Cube();
        let setup = algs.join(" ");
        cube.move(setup);
        return cube.solve();
    }
}

const a = new bufferTrainer("UB");
for (let i = 0; i < 1000; i++) {
    console.log(a.getScram())
}
