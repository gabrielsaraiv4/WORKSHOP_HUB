export interface Colaborador {
    id: number;
    nome: string;
}

export interface Workshop {
    id: number;
    nome: string;
    dataRealizacao: string;
    descricao: string;
    participantes?: Colaborador[];
}