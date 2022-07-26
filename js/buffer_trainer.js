Cube.initSolver();

const PIECES = ["UB", "UR", "UL", "DF", "DB", "FR", "FL", "DR", "DL", "BR", "BL"]

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
        this.buffer = buffer;
        this.pieces = PIECES.slice(PIECES.indexOf(buffer) + 1);
        console.log(this.pieces);
    }
    genRandomTargets() {
        let targets = [];
        let availablePieces = Array.from(this.pieces) 
        for (let i = 0; i < evenize(this.pieces.length); i++) {
            let r = randIndex(availablePieces);
            let randPiece = availablePieces.splice(r, 1)[0];
            
            if (randBool()) {
                randPiece = reverseString(randPiece);
            }

            targets.push(randPiece);
        }
        return targets;
    }
    getScram() {
        let targets = this.genRandomTargets();
        let algs = [];
        for (let i = 0; i < targets.length / 2; i++) {
            let firstTarget = targets[i * 2];
            let secondTarget = targets[i * 2 + 1];
            algs.push(COMMS[this.buffer][firstTarget][secondTarget]);
        }
        const cube = new Cube();
        let setup = algs.join(" ");
        cube.move(setup);
        return cube.solve();
    }
}
