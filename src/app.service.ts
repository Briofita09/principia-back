import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import readCsv from './utils/readCsv';
import { PrismaService } from './prisma.service';
import calculateAllVotes from './utils/calculateAllVotes';
import { Cron } from '@nestjs/schedule';
import { ICities } from './interfaces/interfaces';


@Injectable()
export class AppService {
  private cities: ICities[];

  constructor(private prismaService: PrismaService) {
    this.initializeCities();
  }

  private async initializeCities() {
    this.cities = await this.readDatabase()
  }

  getHello(): string {
    return 'Hello World';
  }

  async getVotesByUf(uf: string) {
    const state = uf.toUpperCase()
    const allVotes = await calculateAllVotes(this.cities)
    const result = allVotes.map(el => {
      return el[state] ? { [state]: el[state] } : null;
    }).filter(Boolean)
    return result.length > 0 ? result : { [state]: {} };
  }

  async fileUpload(file: Express.Multer.File): Promise<string> {
    const uploadPath = path.join(__dirname, '..', 'workbooks', file.originalname)
    fs.writeFile(uploadPath, file.buffer, (err) => {
      if (err) {
        throw new Error('Erro ao salvar o arquivo')
      }
    })
    return 'Arquivo salvo corretamente'
  }

  @Cron('* 0 0 1 * *')
  async updateDatabase() {
    console.log('data base updated')
    const data: any = await readCsv('pop2022')
    data.forEach(async (d) => {
      await this.prismaService.city.upsert({
        where: { codMun: d.codMun },
        create: {
          uf: d.uf,
          codUf: d.codUf,
          municipio: d.municipio,
          pop: d.pop,
          codMun: d.codMun
        },
        update: {
          uf: d.uf,
          codUf: d.codUf,
          municipio: d.municipio,
          pop: d.pop,
          codMun: d.codMun
        }
      })
    })
  }

  async readDatabase() {
    return await this.prismaService.city.findMany()
  }
}
