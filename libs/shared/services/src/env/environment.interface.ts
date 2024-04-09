import { Neo4jScheme } from "nest-neo4j/dist";

export interface IEnvironment {
    production: boolean;
    apiURL: string;
    port: number;
    mongoDBConnectionString: string;
    neo4j: {
      scheme: Neo4jScheme;
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
    jwtSecret: string;
    saltRounds: number;
}
