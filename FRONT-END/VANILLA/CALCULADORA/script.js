// Pega o visor da calculadora pelo id definido no HTML.
// Isso permite alterar o que aparece na tela.
let visor = document.getElementById("visor");


// Função responsável por adicionar números ou operadores no visor.
function adicionar(valor) {

    // Verifica se o visor está com "0".
    // Evita ficar algo como "05".
    if (visor.innerText === "0") {

        // Substitui o "0" pelo valor digitado.
        visor.innerText = valor;

    } else {

        // Caso já tenha conteúdo, adiciona no final.
        // Exemplo: "7" vira "7+"
        visor.innerText += valor;
    }
}


// Função que limpa completamente o visor.
function limpar() {

    // Define o visor novamente como "0".
    visor.innerText = "0";
}


// Função que remove o último caractere (tipo backspace).
function apagar() {

    // slice(0, -1) remove o último caractere da string.
    visor.innerText = visor.innerText.slice(0, -1);

    // Se ficar vazio após apagar...
    if (visor.innerText === "") {

        // ...retorna para "0".
        visor.innerText = "0";
    }
}


// Função que realiza o cálculo da expressão.
function calcular() {

    // try tenta executar o código.
    // Se houver erro, o catch será acionado.
    try {

        // eval interpreta a string como expressão matemática.
        // Exemplo: "5+3" vira 8.
        visor.innerText = eval(visor.innerText);

    } catch {

        // Caso a expressão seja inválida, mostra erro.
        visor.innerText = "Erro";
    }
}


// Evento que escuta teclas pressionadas no teclado.
document.addEventListener("keydown", function(event) {

    // Captura a tecla pressionada.
    let tecla = event.key;


    // Verifica se a tecla é um número.
    if (!isNaN(tecla)) {

        // Se for número, adiciona ao visor.
        adicionar(tecla);
    }


    // Verifica se é operador matemático.
    if (["+", "-", "*", "/"].includes(tecla)) {

        // Adiciona operador ao visor.
        adicionar(tecla);
    }


    // Verifica se é ponto decimal.
    if (tecla === ".") {

        // Adiciona ponto.
        adicionar(".");
    }


    // Se for Enter, realiza o cálculo.
    if (tecla === "Enter") {

        calcular();
    }


    // Se for Backspace, apaga último caractere.
    if (tecla === "Backspace") {

        apagar();
    }


    // Se for Delete ou Escape, limpa tudo.
    if (tecla === "Delete" || tecla === "Escape") {

        limpar();
    }

});