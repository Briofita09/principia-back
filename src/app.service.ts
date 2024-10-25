import { Injectable } from '@nestjs/common';
import readCsv from './utils/readCsv';
import calculateVotesByCity from './utils/calculateVotesByCity';
import { BigQuery } from '@google-cloud/bigquery';
import sortCitiesByState from './utils/sortCitiesByState';
import sortVotesByUf from './utils/classificateCities';
import calculateTotalVotes from './utils/calculateTotalVotes';
import calculateAllVotes from './utils/calculateAllVotes';


@Injectable()
@Injectable()
export class AppService {
  private cities: any;

  constructor() {
    this.initializeCities();
  }

  private async initializeCities() {
    this.cities = await readCsv('pop2022');
  }

  async getHello(): Promise<string> {
    const pools = ["P2"];

    await Promise.all(pools.map(async (p) => {
      const data: any = await readCsv(p);
      const votes = calculateVotesByCity(data);
      const sortedVotesByState = sortCitiesByState(votes);
      const votesByGroupbyUF = sortVotesByUf(sortedVotesByState, this.cities);
      // console.log(calculateTotalVotes(votesByGroupbyUF));
      console.log(await calculateAllVotes(this.cities));
    }));

    return 'ola';
  }
}
