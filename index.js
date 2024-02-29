class Pila {
    constructor() {
        this.elementos = [];
    }

    push(elemento) {
        this.elementos.push(elemento);
    }

    pop() {
        if (this.estaVacia()) {
            throw new Error("La pila está vacía");
        }
        return this.elementos.pop();
    }

    estaVacia() {
        return this.elementos.length === 0;
    }

    imprimir() {
        console.log(this.elementos);
    }

}

const tabla = {
    S: { '{': ['I', 'M', 'A', 'F'] },
    A: { '}': ['ε'], ';': [';', 'M', 'A'] },
    M: { 'displayData': ['D', '(', 'C', ')' ] },
    D: { 'displayData': ['displayData'] },
    C: { '"': ['"', 'T', '"'] },
    I: { '{': ['{'] },
    F: { '}': ['}'] },
    T: { '[a-z]': ['[a-z]'] }
};

const terminales = ['{', 'displayData', '"', '}', ';', '(', ')', '[a-z]', 'ε'];
const noTerminales  = ['S', 'A', 'M', 'D', 'C', 'I', 'F', 'T', 'L', 'R'];

function separarEntrada(entrada) {
    const patron = /({|}|\(|\)|;|,|==|<=|>=|!=|<|>|[a-zA-Z_][a-zA-Z0-9_]*|\d+|")/g;
    let tokens = [];
    let lastIndex = 0;
    let match;

    while ((match = patron.exec(entrada)) !== null) {
        if (match.index > lastIndex) {
            tokens.push(entrada.substring(lastIndex, match.index));
        }
        tokens.push(match[0]);
        lastIndex = patron.lastIndex;
    }

    if (lastIndex < entrada.length) {
        tokens.push(entrada.substring(lastIndex));
    }
    return tokens.filter(token => token.trim().length > 0);
}


function parse(){
    const entrada = document.getElementById('textoEntrada').value;
    const tokens = separarEntrada(entrada);
    console.log(tokens);
    const stack = new Pila();
    stack.push('$');
    stack.push('S');
    let X;
    let aux;
    let resultado;
    let prueba;
    do{
        X = stack.pop();
        if(terminales.includes(X)){
            if(X == tokens[0]){
                tokens.shift();
            }else if(X == 'ε'){
            }else if(X == "[a-z]"){
                prueba = tokens.shift();
                if(!/[a-z]+/.test(prueba)){
                    resultado = "Error, No se encontro ninguna producción y No paso el Regex.";
                    break;
                }
            }else{
                resultado = "Error, No se encontro ninguna producción.";
                break;
            }
        }else if(noTerminales.includes(X)){
            aux = tokens[0];
            M = Object.values(tabla[X]);
            if(aux == ';'){
                M[1] = M[1].slice().reverse();
                M[1].forEach(element => stack.push(element));
            }else{
                M[0] = M[0].slice().reverse();
                M[0].forEach(element => stack.push(element));
            }
        }else{
            if (X != '$') {
                resultado = "Error, estado de la pila: " + stack.imprimir();
                break;
            }
        }
    }while(X != '$');
    if(resultado === undefined && tokens.length === 0){
        resultado = 'La cadena es valida.';
    }else{
        resultado = "Error cadena invalida.";
    }
    document.getElementById('contenidoResultado').innerText = resultado;
}