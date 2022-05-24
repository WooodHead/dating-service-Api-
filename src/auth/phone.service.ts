import { config } from 'dotenv';
import fetch from 'node-fetch';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

config();

@Injectable()
export class PhoneAuthService {
  private apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get('GOOGLE_API_KEY');
  }

  async getPhoneData(idToken: string): Promise<{
    phoneNumber: string;
  }> {
    const fetchResult = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
        }),
      },
    );
    const result = await fetchResult.json();
    return result?.users?.[0];
  }

  async validate(accessToken: string): Promise<{
    phoneNumber: string;
  }> {
    const profile = await this.getPhoneData(accessToken);
    return profile;
  }
}
