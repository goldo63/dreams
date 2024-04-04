import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { FeatureModule } from '@dreams/backend/features';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenMiddleware, AuthModule } from '@dreams/backend/auth';
import { RouterModule } from '@nestjs/core';
import { Neo4jModule } from 'nest-neo4j';


@Module({
  imports: [
    AuthModule,
    FeatureModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'data',
        module: FeatureModule,
      },
    ]),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
          connection.on('connected', () => {
              // console.log('is connected');
              Logger.verbose(
                  `Mongoose db connected to ${process.env.MONGO_DB_CONNECTION_STRING}`
              );
          });

          connection.on('error', (error) => {
            Logger.error(
              `An error occurred while connecting to ${process.env.MONGO_DB_CONNECTION_STRING}`
            );
          });
  
          connection.on('disconnected', () => {
            Logger.warn('Mongoose disconnected', 'Mongoose');
          });

          connection._events.connected();
          return connection;
      }
    }),
    Neo4jModule.forRoot({
      scheme: 'bolt',
      host: process.env.NEO4J_HOST,
      port: process.env.NEO4J_PORT,
      username: process.env.NEO4J_USER,
      password: process.env.NEO4J_PASSWORD,
      database: process.env.NEO4J_DATABASE,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('data');
  }
}
