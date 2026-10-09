import type { Entity } from '@/types/entity';
import api from './api';

export async function getEntities(userId: string): Promise<Entity[]> {
  // const { data: entities } = await api.get<Entity[]>(`/${userId}/entities`);
  // return entities;
  return [{
            id: '1',
            code: '1234',
            name: 'FARMACIA CRUZ PASSOS',
            bussinesName: 'FARMACIA CRUZ PASSOS LTDA',
            document: '10.237.761/0009-72',
            address: 'ESTRADA DE CAMPINAS, 508, SAO CAETANO, SALVADOR - BA',
            alerts: null
        },
        {
            id: '2',
            code: '9999',
            name: 'DROGARIA ARAUJO',
            bussinesName: 'DROGARIA ARAUJO LTDA',
            document: '12.999.456/0001-00',
            address: 'AVENIDA ANTONIO CARLOS, 99, CENTRO, BELO HORIZONTE - MG',
            alerts: [
                'Retinoicos - Vencidos ha 123 dia(s) (01/01/2026)',
            ]
        },
        {
            id: '3',
            code: '345296',
            name: 'FARMACIA SAO JOAO',
            bussinesName: 'COMERCIAL FARMACEUTICA SAO JOAO LTDA',
            document: '36.179.551/0001-01',
            address: 'RUA PADRE FREIRE DE MENEZES, 05 SALA 01, CENTRO - POCOS DE CALDAS - MG',
            alerts: null
        },
        {
            id: '4',
            code: '274569',
            name: 'DROGARIA POPULAR',
            bussinesName: 'DROGARIA POPULAR DO POVO EIRELI',
            document: '08.456.123/0001-55',
            address: 'AVENIDA BRASIL, 1500, JARDIM AMERICA, RIBEIRAO PRETO - SP',
            alerts: [
                'Alvara sanitario - Vence em 15 dia(s) (23/10/2026)',
            ]
        },
        {
            id: '5',
            code: '118734',
            name: 'FARMA BEM ESTAR',
            bussinesName: 'BEM ESTAR PRODUTOS FARMACEUTICOS LTDA',
            document: '21.334.908/0001-12',
            address: 'RUA DAS FLORES, 210, BOA VISTA, RECIFE - PE',
            alerts: null
        },
        {
            id: '6',
            code: '502210',
            name: 'DROGARIA VIDA E SAUDE',
            bussinesName: 'VIDA E SAUDE DROGARIA LTDA',
            document: '17.882.640/0002-30',
            address: 'AVENIDA SETE DE SETEMBRO, 3320, BARRA, SALVADOR - BA',
            alerts: [
                'Retinoicos - Vencidos ha 12 dia(s) (26/09/2026)',
                'Antimicrobianos - Vencidos ha 40 dia(s) (29/08/2026)',
            ]
        },
        {
            id: '7',
            code: '667812',
            name: 'FARMACIA DO TRABALHADOR',
            bussinesName: 'FARMACIA DO TRABALHADOR DE GOIAS LTDA',
            document: '03.765.219/0001-48',
            address: 'RUA 44, 780, SETOR CENTRAL, GOIANIA - GO',
            alerts: null
        },
        {
            id: '8',
            code: '731045',
            name: 'DROGARIA SANTA LUZIA',
            bussinesName: 'SANTA LUZIA COMERCIO DE MEDICAMENTOS LTDA',
            document: '29.104.557/0001-91',
            address: 'AVENIDA GETULIO VARGAS, 455, CENTRO, JUIZ DE FORA - MG',
            alerts: null
        },
        {
            id: '9',
            code: '845367',
            name: 'FARMACIA NOVA ESPERANCA',
            bussinesName: 'NOVA ESPERANCA FARMA LTDA ME',
            document: '45.678.302/0001-06',
            address: 'RUA XV DE NOVEMBRO, 1020, CENTRO, CURITIBA - PR',
            alerts: [
                'Limite de credito excedido',
            ]
        },
        {
            id: '10',
            code: '912458',
            name: 'DROGA LESTE',
            bussinesName: 'DROGA LESTE DISTRIBUICAO E VAREJO LTDA',
            document: '11.223.344/0001-70',
            address: 'AVENIDA ARICANDUVA, 5555, VILA MATILDE, SAO PAULO - SP',
            alerts: null
        },
        {
            id: '11',
            code: '987001',
            name: 'FARMACIA PAGUE MENOS',
            bussinesName: 'FARMACIA ECONOMICA PAGUE MENOS LTDA',
            document: '06.627.384/0004-23',
            address: 'AVENIDA BEIRA MAR, 3000, MEIRELES, FORTALEZA - CE',
            alerts: null
        },
        {
            id: '12',
            code: '1023',
            name: 'DROGARIA CENTRAL',
            bussinesName: 'DROGARIA CENTRAL DE CAMPINAS LTDA',
            document: '50.912.876/0001-34',
            address: 'RUA BARAO DE JAGUARA, 900, CENTRO, CAMPINAS - SP',
            alerts: [
                'Titulos em atraso - 2 boleto(s)',
            ]
        }];
}

export async function getEntity(entityId: string): Promise<Entity> {
  // const { data: entity } = await api.get<Entity>(`/entity/${entityId}`);
  //return entity;
 return {
   id: '1',
    code: '1234',
    name: 'FARMACIA CRUZ PASSOS',
    bussinesName: 'FARMACIA CRUZ PASSOS LTDA',
    document: '10.237.761/0009-72',
    address: 'ESTRADA DE CAMPINAS, 508, SAO CAETANO, SALVADOR - BA',
    alerts: null
 }
  
}

export async function updateEntity(form: { id: string }) {
  await api.post('/entity', form);
}

// TODO update password
