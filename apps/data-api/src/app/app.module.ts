import { Logger, Module } from '@nestjs/common';
import { FeatureModule } from '@dreams/backend/features'
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@dreams/shared/services'

@Module({
  imports: [
    FeatureModule,
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
          connection.on('connected', () => {
              // console.log('is connected');
              Logger.verbose(
                  `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
              );
          });

          connection.on('error', (error) => {
            Logger.error(
              `An error occurred while connecting to ${environment.MONGO_DB_CONNECTION_STRING}`
            );
          });
  
          connection.on('disconnected', () => {
            Logger.warn('Mongoose disconnected', 'Mongoose');
          });

          connection._events.connected();
          return connection;
      }
  }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
