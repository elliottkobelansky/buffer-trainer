Cube.initSolver();

const EDGES = ["UB", "UR", "UL", "DF", "DB", "FR", "FL", "DR", "DL", "BR", "BL"]
const CORNERS = ["UFR", "UFL", "UBL", "UBR", "DFR", "DFL", "DBR", "DBL"]

function randIndex(list) {
    let index = Math.floor(Math.random()*list.length);
    return index;
}

function randBool() {
    return Math.random() < 0.5;
}

function randTern() {
    let rand = Math.random() * 3;
    if (rand <= 1) {
        return 0;
    }
    else if (rand <= 2) {
        return 1;
    }
    else {
        return 2;
    }
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function cornerCaseOne(str) {
    let arr = str.split('');
    [arr[0], arr[1]] = [arr[1], arr[0]];
    return arr.join('');
}

function cornerCaseTwo(str) {
    let arr = str.split('');
    [arr[0], arr[1], arr[2]] = [arr[2], arr[0], arr[1]];
    return arr.join('');
}

function evenize(int) {
    return int - (int % 2)
}

class bufferTrainer {
    constructor(eBuffer, cBuffer) {
        this.eBuffer = eBuffer;
        this.cBuffer = cBuffer;
        if (eBuffer !== "None") {
            this.edgepieces = EDGES.slice(EDGES.indexOf(eBuffer) + 1);
        }
        if (cBuffer !== "None") {
            this.cornerpieces = CORNERS.slice(CORNERS.indexOf(cBuffer) + 1);
        }
    }
    genRandomEdgeTargets() {
        let targets = [];
        let availablePieces = Array.from(this.edgepieces) 
        for (let i = 0; i < evenize(this.edgepieces.length); i++) {
            let r = randIndex(availablePieces);
            let randPiece = availablePieces.splice(r, 1)[0];
            
            if (randBool()) {
                randPiece = reverseString(randPiece);
            }

            targets.push(randPiece);
        }
        return targets;
    }
    genRandomCornerTargets() {
        let targets = [];
        let availablePieces = Array.from(this.cornerpieces)
        for (let i = 0; i < evenize(this.cornerpieces.length); i++) {
            let r = randIndex(availablePieces);
            let randPiece = availablePieces.splice(r, 1)[0];

            let randtern = randTern();
            if (randtern === 1) {
                randPiece = cornerCaseOne(randPiece);
            }
            else if (randtern === 2) {
                randPiece = cornerCaseTwo(randPiece);
            }
            targets.push(randPiece);
        }
        return targets
    }
    getScram() {
        let algs = [];
        
        if (this.eBuffer !== "None") {
            let edgetargets = this.genRandomEdgeTargets();
            for (let i = 0; i < edgetargets.length / 2; i++) {
                let first = edgetargets[i * 2];
                let second = edgetargets[i * 2 + 1];
                algs.push(COMMS[this.eBuffer][first][second]);
            }
        }

        if (this.cBuffer !== "None") {
            let cornertargets = this.genRandomCornerTargets();
            for (let i = 0; i < cornertargets.length / 2; i++) {
                let first = cornertargets[i * 2];
                let second = cornertargets[i * 2 + 1];
                algs.push(COMMS[this.cBuffer][first][second]);
            }
        }

        const cube = new Cube();
        let setup = algs.join(" ");
        cube.move(setup);
        return cube.solve();
    }
}
