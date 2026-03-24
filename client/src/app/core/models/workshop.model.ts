import { Colaborador } from './colaborador.model';

export interface Workshop {
  id: number;
  nome: string;
  dataRealizacao: string | Date;
  descricao: string;
  participantes?: Colaborador[];
}