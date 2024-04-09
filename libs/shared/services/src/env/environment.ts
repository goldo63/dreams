import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,
    apiURL: 'http://localhost:3000/api',
    port: 3000,
    mongoDBConnectionString: 'mongodb://localhost:27017/dreams',
    neo4j: {
      scheme: 'bolt',
      host: 'localhost',
      port: 7687,
      user: 'neo4j',
      password: 'Goldo123',
      database: 'dreams'
    },
    jwtSecret: 'secretKey',
    saltRounds: 10

};
