const E = [4, 2, 3, 1]
var A = [2, 1, 0, 0]
var C = [
    [0, 0, 1, 0],
    [2, 0, 0, 1],
    [0, 1, 2, 0]
]

var R = [
    [2, 0, 0, 1],
    [1, 0, 1, 0],
    [2, 1, 0, 0]
]


function ehPossivelExecutar(requisicao) {
    for (let i = 0; i < A.length; i++) {
        if (requisicao[i] > A[i]) {
            return false
        }
    }
    return true
}

function algoritmoDoBanqueiro() {
    while (C.length > 0) {
        let executou = false
        R.forEach((reqRecursos, index) => {
            if (ehPossivelExecutar(reqRecursos)) {
                for (let i = 0; i < reqRecursos.length; i++) {
                    A[i] = C[index][i] + A[i]
                }
                C.splice(index, 1)
                R.splice(index, 1)
                executou = true
                
            }            
        })   
        if(!executou){
            return 'Deadlock!!!'
        }
    }
    return 'Executou todos os processos.'
}
console.log(`Resultado \n${algoritmoDoBanqueiro()} \nRecursos disponíveis: ${A}`)




