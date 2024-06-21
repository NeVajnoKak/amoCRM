import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AmoCrmModule } from './amocrm/amocrm.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HttpModule,
    AmoCrmModule,
    AuthModule,
  ],
})
export class AppModule {}
