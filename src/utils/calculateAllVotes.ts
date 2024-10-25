import fs from 'fs';
import path from 'path';
import sortVotesByUf from './classificateCities';
import readCsv from './readCsv';
import calculateVotesByCity from './calculateVotesByCity';
import sortCitiesByState from './sortCitiesByState';

export default async function calculateAllVotes(cities) {
  // Caminho da pasta que você quer listar os arquivos
  const filesPath = './workbooks';

  // Função para listar os arquivos como array de strings
  const files = fs.readdirSync(filesPath)
    .filter(file => fs.statSync(path.join(filesPath, file)).isFile())
    .map(file => file.replace('.csv', '')); 

    let allPools = [];

    const promises = files.map(async (p) => {
        const data: any = await readCsv(p);
        const votes = calculateVotesByCity(data);
        const sortedVotesByState = sortCitiesByState(votes);
        const votesByGroupbyUF = sortVotesByUf(sortedVotesByState, cities);
        return votesByGroupbyUF;
    });
    
    allPools = await Promise.all(promises);
    return allPools
}