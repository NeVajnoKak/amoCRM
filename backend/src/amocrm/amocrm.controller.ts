import { Controller, Get, Query } from '@nestjs/common';
import { AmoCrmService } from './amocrm.service';

@Controller('api/leads')
export class AmoCrmController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Get()
  async findAll(@Query('query') query: string) {
    const leads = await this.amoCrmService.getLeads(query);

    return { leads: leads.data};
  }
}

