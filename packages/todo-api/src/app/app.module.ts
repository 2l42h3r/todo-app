import { CacheModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresDatabaseProviderModule } from '../providers/database/postgres/provider.module';

@Module({
  imports: [PostgresDatabaseProviderModule, CacheModule.register()],
  exports: [PostgresDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
