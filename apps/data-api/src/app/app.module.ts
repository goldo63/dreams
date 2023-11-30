import { Module } from '@nestjs/common';
import { FeatureModule } from '@dreams/backend/features'
import { AppController } from './app.controller';

@Module({
  imports: [FeatureModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
