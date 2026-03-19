import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, pass: string): Promise<any> {
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'dpavel2026';

    if (username === adminUser && pass === adminPass) {
      return { username };
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: 'dpavel-persistent-token',
      usuario: user.username,
      ok: true,
    };
  }
}
