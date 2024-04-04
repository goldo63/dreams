import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { FeatureModule } from '@dreams/backend/features';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenMiddleware, AuthModule } from '@dreams/backend/auth';
import { RouterModule } from '@nestjs/core';
import { Neo4jModule } from 'nest-neo4j';
import { environment } from '@dreams/shared/services';


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
    MongooseModule.forRoot(environment.mongoDBConnectionString, {
      connectionFactory: (connection) => {
          connection.on('connected', () => {
              // console.log('is connected');
              Logger.verbose(
                  `Mongoose db connected to ${environment.mongoDBConnectionString}`
              );
          });

          connection.on('error', (error) => {
            Logger.error(
              `An error occurred while connecting to ${environment.mongoDBConnectionString}`
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
      host: environment.neo4j.host,
      port: environment.neo4j.port,
      username: environment.neo4j.user,
      password: environment.neo4j.password,
      database: environment.neo4j.database,
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
