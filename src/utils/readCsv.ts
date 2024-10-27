import fs from 'fs';
import { parse } from "csv-parse";

export default async function readCsv(pool){
    return new Promise((resolve, reject) => {
        let data = [];
        if(pool === 'pop2022'){
          fs.createReadStream(`./workbooks/database/${pool}.csv`, { encoding: 'utf8' })
          .pipe(parse({ delimiter: ";", from_line: 3 }))
          .on("data", (row) => {
              if (row.length >= 5) {
                const [uf, codUf, codMun, nome, pop] = row;
                data.push({
                  uf: uf.trim(),
                  codUf: codUf.trim(),
                  municipio: nome.trim().toLowerCase(),
                  codMun: codMun.trim(),
                  pop: pop.trim(),
                });
              }
          })
          .on("end", () => {
              resolve(data);
          })
          .on("error", (error) => {
              reject(error);
            });
          return data
        }
        fs.createReadStream(`./workbooks/${pool}.csv`, { encoding: 'utf8' })
        .pipe(parse({ delimiter: ";", from_line: 2 }))
        .on("data", (row) => {
            if (row.length >= 5) {
              const [pesquisa, dataString, municipio, UF, candidato] = row;
              data.push({
                pesquisa: pesquisa.trim(),
                data: dataString.trim(),
                municipio: municipio.trim().toLowerCase(),
                UF: UF.trim(),
                candidato: candidato.trim(),
              });
            }
        })
        .on("end", () => {
            resolve(data);
        })
        .on("error", (error) => {
            reject(error);
          });
      });
}