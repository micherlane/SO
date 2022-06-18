const lodash = require('lodash')

const quantum = 15
const trocaContexto = 4
var pronto = []

class Processo {
    constructor(id, tempoExecucao, ingresso, fimDaExecucao = 0) {
        this.id = id
        this.tempoExecucao = tempoExecucao
        this.ingresso = ingresso
        this.fimDaExecucao = fimDaExecucao
        
    }

    
}

function _estaEmOrdem(processos) {
    for (let index = 0; index < processos.length; index++) {
        if (processos[index + 1]?.ingresso < processos[index]?.ingresso) {
            return false
        }
    }
    return true
}

function ordemExecucao(processos) {

    while (!_estaEmOrdem(processos)) {
        for (let index = 0; index < processos.length; index++) {
            if (processos[index + 1]?.ingresso < processos[index]?.ingresso) {
                let aux = processos[index + 1]
                processos[index + 1] = processos[index]
                processos[index] = aux
            }
        }
    }
    return processos
}

function escalonamentoCicular(processos) {
    let tempo = processos[0].ingresso
    let qtdProcessos = processos.length
    pronto = lodash.cloneDeep(processos)    

    while (qtdProcessos > 0) {
        if(pronto.length == 0){
            tempo++
        } else {
            let execucao = pronto.shift()
            let q = quantum
            while(q > 0 && execucao.tempoExecucao > 0){
                q--
                tempo++
                execucao.tempoExecucao = execucao.tempoExecucao - 1
            }
            
            if(execucao.tempoExecucao > 0){
                tempo+=trocaContexto
                pronto.push(execucao)
            }else{
                processos.map(processo => {
                    if(processo.id == execucao.id){
                        processo.fimDaExecucao = tempo
                    }
                })
                qtdProcessos--
                
            }
        }
    }
    
    let tempoTurnAround = 0
    let tempoEspera = 0
    processos.forEach(proc => {
        tempoEspera += proc.fimDaExecucao - proc.ingresso - proc.tempoExecucao
        tempoTurnAround += proc.fimDaExecucao - proc.ingresso
    });

    processos.forEach(proc => console.log(`${proc.id} - ${proc.fimDaExecucao - proc.ingresso}`))

    console.log(`Tempo Médio de espera: ${tempoEspera/processos.length}`)
}





function main() {
    let p1 = new Processo('P1', 20, 4)
    let p2 = new Processo('P2', 30, 1)
    let p3 = new Processo('P3', 40, 3)
    let p4 = new Processo('P4', 35, 0)

    let processos = ordemExecucao([p1, p2, p3, p4])


    escalonamentoCicular(processos)


}

main()
