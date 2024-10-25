export default function calculateTotalVotes(ufData) {
    const totalVotos: Record<string, number> = {};
    let votosTotais: number = 0;

    // Iterar sobre cada UF
    for (const uf in ufData) {
        const municipios = ufData[uf];

        // Iterar sobre os municípios da UF
        for (const municipio in municipios) {
            const { candidatos } = municipios[municipio];

            // Iterar sobre os candidatos
            for (const candidato in candidatos) {
                if (!totalVotos[candidato]) {
                    totalVotos[candidato] = 0; // Inicializa se ainda não existir
                }
                totalVotos[candidato] += candidatos[candidato]; // Soma os votos
            }
        }
    }

    // Calcular o total de votos
    votosTotais = Object.values(totalVotos).reduce((acc: number, votos: number) => acc + votos, 0);

    // Calcular porcentagem para cada candidato
    const porcentagens: Record<string, number> = {};
    for (const candidato in totalVotos) {
        porcentagens[candidato] = (totalVotos[candidato] / votosTotais) * 100; // Calcula a porcentagem
    }

    return {
        totalVotos,
        porcentagens,
        votosTotais
    };
}