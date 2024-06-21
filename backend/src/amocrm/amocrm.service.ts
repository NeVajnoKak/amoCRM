import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AmoCrmService {
  private readonly clientId = process.env.CLIENT_ID;
  private readonly clientSecret = process.env.CLIENT_SECRET;
  private readonly redirectUri = `${process.env.REDIRECT_URI}`;
  private refreshToken = process.env.REFRESH_TOKEN;
  private accessToken: string;

  constructor(private readonly httpService: HttpService) {}

  async exchangeCodeForToken(code: string) {
    try {
      const response = await firstValueFrom(this.httpService.post(`https://${process.env.AMOCRM_DOMAIN}/oauth2/access_token`, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri,
      }));

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      return this.accessToken;
    } catch (error) {
      throw new HttpException('Failed to exchange code for token', HttpStatus.UNAUTHORIZED);
    }
  }

  async refreshAccessToken() {
    try {
      const response = await firstValueFrom(this.httpService.post(`https://${process.env.AMOCRM_DOMAIN}/oauth2/access_token`, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
        redirect_uri: this.redirectUri,
      }));

      this.accessToken = response.data.access_token;
    } catch (error) {
      throw new HttpException('Failed to refresh access token', HttpStatus.UNAUTHORIZED);
    }
  }

  async getLeads(query?: string): Promise<AxiosResponse<any>> {
    const url = `https://${process.env.AMOCRM_DOMAIN}/api/v4/leads`;
    const params = query ? { query } : {};
  
    try {
      const response = await firstValueFrom(this.httpService.get(url, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        },
        params,
      }));
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(`Failed to fetch leads: ${error.response.data.message}`, error.response.status);
      } else if (error.request) {
        throw new HttpException('Request made but no response received', HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new HttpException('Failed to make request to AmoCRM API', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  
}
