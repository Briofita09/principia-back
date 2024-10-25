export default function sortCitiesByState(cities){
    return cities.reduce((acc, pesquisa) => {
        const { UF } = pesquisa;
    
        // Se a UF ainda não existir no acumulador, inicialize-a como um array
        if (!acc[UF]) {
          acc[UF] = [];
        }
    
        // Adiciona o objeto completo da pesquisa ao array correspondente à UF
        acc[UF].push(pesquisa);
    
        return acc;
      }, {});
}