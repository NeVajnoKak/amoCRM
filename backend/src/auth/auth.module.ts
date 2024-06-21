import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AmoCrmService } from '../amocrm/amocrm.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AmoCrmService],
})
export class AuthModule {}
