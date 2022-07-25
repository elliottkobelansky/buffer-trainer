let b = new bufferTrainer("UF");
console.log(b.getScram());

document.getElementById("genScram").onclick = gen;

let nextscram = b.getScram();
function gen() {
    console.log(nextscram);
    nextscram = b.getScram();
}

