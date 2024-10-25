function citieSize(pop) {
    if (pop <= 20000) return 1;
    if (pop <= 100000) return 2;
    if (pop <= 1000000) return 3;
    return 4;
}

export default function sortVotesByUf(pesquisas, municipios) {
    const resultado = {};

    // Criar um mapa de populações por município
    const populacaoMap = {};
    municipios.forEach(municipio => {
        // Remover pontos e converter a string para inteiro
        populacaoMap[municipio.municipio] = parseInt(municipio.pop.replace(/\./g, ''), 10);
    });

    // Iterar sobre as UFs no objeto de pesquisas
    for (const uf in pesquisas) {
        const listaPesquisas = pesquisas[uf];

        // Inicializa a estrutura no resultado para a UF
        resultado[uf] = {};

        listaPesquisas.forEach(pesquisa => {
            const { municipio, candidatos, data } = pesquisa; // Inclui a data

            // Obter a população do município correspondente
            const populacaoMunicipio = populacaoMap[municipio] || 0;
            const grupo = citieSize(populacaoMunicipio);

            // Inicializa a estrutura para o grupo se ainda não existir
            if (!resultado[uf][grupo]) {
                resultado[uf][grupo] = { data: '', totalPopulacao: 0, candidatos: {}, totalVotos: 0 };
            }

            // Adiciona a população ao grupo
            resultado[uf][grupo].totalPopulacao += populacaoMunicipio;

            // Define a data do grupo (assumindo que você deseja a última data)
            resultado[uf][grupo].data = data;

            // Agrega os votos de cada candidato
            for (const candidato in candidatos) {
                // Ignorar candidatos com chaves '#N/D'
                if (candidato === '#N/D') continue;

                if (!resultado[uf][grupo].candidatos[`candidato${candidato}`]) {
                    resultado[uf][grupo].candidatos[`candidato${candidato}`] = 0;
                }
                resultado[uf][grupo].candidatos[`candidato${candidato}`] += candidatos[candidato];
                resultado[uf][grupo].totalVotos += candidatos[candidato]; // Soma total de votos no grupo
            }
        });

        // Calcular porcentagens para cada candidato no grupo
        for (const grupo in resultado[uf]) {
            const candidatos = resultado[uf][grupo].candidatos;
            const totalVotosGrupo = resultado[uf][grupo].totalVotos;

            for (const candidato in candidatos) {
                if (totalVotosGrupo > 0) {
                    const porcentagem = (candidatos[candidato] / totalVotosGrupo) * 100;
                    candidatos[candidato] = {
                        votos: candidatos[candidato],
                        porcentagem: porcentagem.toFixed(2) // Formata para 2 casas decimais
                    };
                }
            }
        }

        // Remover grupos que não possuem candidatos válidos
        for (const grupo in resultado[uf]) {
            if (Object.keys(resultado[uf][grupo].candidatos).length === 0) {
                delete resultado[uf][grupo];
            }
        }
    }

    // Remover UFs que não possuem grupos válidos
    for (const uf in resultado) {
        if (Object.keys(resultado[uf]).length === 0) {
            delete resultado[uf];
        }
    }
    return resultado;
}
