import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,
  apiURL: 'http://production-url/api',
  port: 80,
  mongoDBConnectionString: 'mongodb://production-db/dreams',
  neo4j: {
    host: 'production-host',
    port: 7687,
    user: 'neo4j',
    password: 'ProductionPassword',
    database: 'dreams'
  },
  jwtSecret: 'productionSecret',
  saltRounds: 10
};
