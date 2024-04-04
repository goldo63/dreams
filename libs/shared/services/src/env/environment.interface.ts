export interface IEnvironment {
    production: boolean;
    apiURL: string;
    port: number;
    mongoDBConnectionString: string;
    neo4j: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
    jwtSecret: string;
    saltRounds: number;
}
