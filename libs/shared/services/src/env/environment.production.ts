import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,
  apiURL: 'https://dreams-api.azurewebsites.net/api',
  port: 8080,
  mongoDBConnectionString: 'mongodb+srv://tpcwaerts:DreamsPass104@dreams.97auaox.mongodb.net/?retryWrites=true&w=majority&appName=dreams',
  neo4j: {
    scheme: 'bolt+s',
    host: '77eac4ce.databases.neo4j.io',
    port: 7687,
    user: 'neo4j',
    password: 'NLij9OG7ZkXFWvokGkvkTCx17_7BaELeG14rlZbP1WY',
    database: 'neo4j'
  },
  jwtSecret: 'productionSecret',
  saltRounds: 10
};
