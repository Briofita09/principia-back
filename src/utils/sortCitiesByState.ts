export default function sortCitiesByState(cities){
    return cities.reduce((acc, city) => {
        const { UF } = city;
  
        if (!acc[UF]) {
          acc[UF] = [];
        }
         
        acc[UF].push(city);
    
        return acc;
      }, {});
}