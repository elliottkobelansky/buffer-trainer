Cube.initSolver();

const EDGES = ["UF", "UB", "UR", "UL", "DF", "DB", "FR", "FL", "DR", "DL", "BR", "BL"]
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

function randomEdgeOri(piece) {
    if (randBool()) {
        return piece.split('').reverse().join('');
    } else {
        return piece
    }
}

function randomCornerOri(piece) {
    let arr = piece.split('');
    let randtern = randTern();

    if (randtern === 1) {
        [arr[0], arr[1]] = [arr[1], arr[0]];
        return arr.join('');
    } else if (randtern === 2) {
        [arr[0], arr[1], arr[2]] = [arr[2], arr[0], arr[1]];
        return arr.join('');
    } else {
        return piece;
    }
}

function evenize(int) {
    return int - (int % 2)
}

class bufferTrainer {
    constructor(userE, userC, excludeEdges, excludeCorners) {
        this.userE = userE;
        this.userC = userC;
        if (excludeEdges !== "All") {
            this.edgepieces = EDGES.slice();
            for (let excludeEdge of excludeEdges) {
                let edgeIndex = this.edgepieces.indexOf(excludeEdge);
                this.edgepieces.splice(edgeIndex, 1);
            }
            this.eBuffer = this.edgepieces.shift();
        } else {
            this.eBuffer = "None";
        }
        if (excludeCorners !== "All") {
            this.cornerpieces = CORNERS.slice();
            for (let excludeCorner of excludeCorners) {
                let cornerIndex = this.cornerpieces.indexOf(excludeCorner);
                this.cornerpieces.splice(cornerIndex, 1);
            }
            this.cBuffer = this.cornerpieces.shift();
        } else {
            this.cBuffer = "None";
        }
    }
    genRandomEdgeTargets() {
        let targets = [];
        let bufferintargets = false;
        let availablePieces = Array.from(this.edgepieces) 
        for (let i = 0; i < evenize(this.edgepieces.length); i++) {
            let r = randIndex(availablePieces);
            let randPiece = availablePieces.splice(r, 1)[0];
            if (randPiece == this.userE) {
                bufferintargets = true;
            }
            targets.push(randomEdgeOri(randPiece));
        }
        if (this.eBuffer !== this.userE && !bufferintargets) {
            targets.splice(randIndex(targets), 1, randomEdgeOri(this.userE));
        }
        return targets;
    }
    genRandomCornerTargets() {
        let targets = [];
        let bufferintargets = false;
        let availablePieces = Array.from(this.cornerpieces)
        for (let i = 0; i < evenize(this.cornerpieces.length); i++) {
            let r = randIndex(availablePieces);
            let randPiece = availablePieces.splice(r, 1)[0];
            if (randPiece == this.userC) {
                bufferintargets = true;
            }
            targets.push(randomCornerOri(randPiece));
        }
        if (this.cBuffer !== this.userC && !bufferintargets) {
            targets.splice(randIndex(targets), 1, randomCornerOri(this.userC));
        }
        return targets;
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
