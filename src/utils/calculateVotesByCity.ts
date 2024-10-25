export default function calculateVotesbyCity(pool: any[]){
  const resultados = {};
  const totalVotes = []

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

    // Contar os votos
    const candidato = pesquisa.candidato;
    if (!resultados[key].candidatos[candidato]) {
      resultados[key].candidatos[candidato] = 0; 
    }
    resultados[key].candidatos[candidato] += 1; 
  }

  // Converter o objeto de resultados em um array
  return Object.values(resultados);

  /*votes.map((el: any) => {
    const candidatos = el.candidatos;
    const city = cities.filter(c => c.municipio === el.municipio)
    if(city.length > 0){
      let population = parseInt(city[0].pop.replace('.',''), 10)
      const totalVotos: any = Object.values(candidatos).reduce((acc: any, votos: any) => acc + votos, 0);
      for(let candidato in candidatos) {
        //console.log(candidatos[candidato], totalVotos)
        candidatos[candidato] = candidatos[candidato] === 0 ? '0' : Math.round((candidatos[candidato]/totalVotos)*population).toString()
        //console.log(candidatos[candidato])
      }
    }
  })*/
}