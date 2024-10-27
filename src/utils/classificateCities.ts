function citieSize(pop) {
    if (pop <= 20000) return 1;
    if (pop <= 100000) return 2;
    if (pop <= 1000000) return 3;
    return 4;
}

export default function sortVotesByUf(pesquisas, municipios) {
    const resultado = {};

    
    const populacaoMap = {};
    municipios.forEach(municipio => {
        
        populacaoMap[municipio.municipio] = parseInt(municipio.pop.replace(/\./g, ''), 10);
    });

    
    for (const uf in pesquisas) {
        const listaPesquisas = pesquisas[uf];

        
        resultado[uf] = {};

        listaPesquisas.forEach(pesquisa => {
            const { municipio, candidatos, data } = pesquisa; 

            
            const populacaoMunicipio = populacaoMap[municipio] || 0;
            const grupo = citieSize(populacaoMunicipio);

            
            if (!resultado[uf][grupo]) {
                resultado[uf][grupo] = { data: '', totalPopulacao: 0, candidatos: {}, totalVotos: 0 };
            }

            
            resultado[uf][grupo].totalPopulacao += populacaoMunicipio;

           
            resultado[uf][grupo].data = data;

           
            for (const candidato in candidatos) {
                //Remove linhas com #N/D
                if (candidato === '#N/D') continue;

                if (!resultado[uf][grupo].candidatos[`candidato${candidato}`]) {
                    resultado[uf][grupo].candidatos[`candidato${candidato}`] = 0;
                }
                resultado[uf][grupo].candidatos[`candidato${candidato}`] += candidatos[candidato];
                resultado[uf][grupo].totalVotos += candidatos[candidato]; 
            }
        });

        
        for (const grupo in resultado[uf]) {
            const candidatos = resultado[uf][grupo].candidatos;
            const totalVotosGrupo = resultado[uf][grupo].totalVotos;

            for (const candidato in candidatos) {
                if (totalVotosGrupo > 0) {
                    const porcentagem = (candidatos[candidato] / totalVotosGrupo) * 100;
                    candidatos[candidato] = {
                        votos: candidatos[candidato],
                        porcentagem: porcentagem.toFixed(2) 
                    };
                }
            }
        }

        
        for (const grupo in resultado[uf]) {
            if (Object.keys(resultado[uf][grupo].candidatos).length === 0) {
                delete resultado[uf][grupo];
            }
        }
    }

    
    for (const uf in resultado) {
        if (Object.keys(resultado[uf]).length === 0) {
            delete resultado[uf];
        }
    }
    return resultado;
}
