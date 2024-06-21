import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AmoCrmService } from './amocrm.service';
import { AmoCrmController } from './amocrm.controller';

@Module({
  imports: [HttpModule],
  providers: [AmoCrmService],
  controllers: [AmoCrmController],
})
export class AmoCrmModule {}
