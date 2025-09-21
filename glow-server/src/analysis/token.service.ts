import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  getUserIdFromToken(token: string): string {
    const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    const payload = this.jwtService.verify(cleanToken);
    return payload.id;
  }
}
