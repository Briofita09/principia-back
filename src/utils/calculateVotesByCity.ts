import { IPool } from "src/interfaces/interfaces";

export default function calculateVotesbyCity(pool: IPool[]){
  const resultados = {};

  for (const pesquisa of pool) {
    const key = `${pesquisa.municipio}-${pesquisa.UF}`; 

    
    if (!resultados[key]) {
      resultados[key] = {
        pesquisa: pesquisa.pesquisa,
        data: pesquisa.data,
        municipio: pesquisa.municipio,
        UF: pesquisa.UF,
        candidatos: {}, 
      };
    }

    const candidato = pesquisa.candidato;
    if (!resultados[key].candidatos[candidato]) {
      resultados[key].candidatos[candidato] = 0; 
    }
    resultados[key].candidatos[candidato] += 1; 
  }

  // Converter o objeto de resultados em um array
  return Object.values(resultados);
}