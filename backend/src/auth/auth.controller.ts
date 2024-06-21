import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AmoCrmService } from '../amocrm/amocrm.service';

@Controller('callback')
export class AuthController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Get()
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const accessToken = await this.amoCrmService.exchangeCodeForToken(code);
      console.log('Access Token:', accessToken); 
      await this.amoCrmService.refreshAccessToken();
      
      res.send('Authorization successful. You can close this window.');
    } catch (error) {
      res.status(500).send('Authorization failed.');
    }
  }
}
