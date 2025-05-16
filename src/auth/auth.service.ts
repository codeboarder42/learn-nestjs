import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private encryptionKey: Buffer;

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const secret = this.configService.get<string>('ENCRYPTION_SECRET');
    if (!secret) {
      throw new Error('ENCRYPTION_SECRET environment variable is not set');
    }
    this.encryptionKey = scryptSync(secret, 'salt', 32);
  }

  async signIn(userName: string, password: string): Promise<any> {
    const user = await this.userService.findOne(userName);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async hashPassword(pass: string): Promise<string> {
    return await hash(pass, 12);
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }

  async encrypt(data: string): Promise<Buffer> {
    // Générer un IV aléatoire pour chaque opération de chiffrement
    const iv = randomBytes(16);

    // Créer le chiffreur avec la clé et l'IV
    const cipher = createCipheriv('aes-256-ctr', this.encryptionKey, iv);

    // Chiffrer les données
    const encrypted = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final(),
    ]);

    // Concaténer l'IV avec les données chiffrées
    return Buffer.concat([iv, encrypted]);
  }

  async decrypt(encryptedData: Buffer): Promise<string> {
    if (encryptedData.length < 16) {
      throw new Error('Invalid encrypted data');
    }

    // Utiliser subarray au lieu de slice
    const iv = encryptedData.subarray(0, 16);

    // Utiliser subarray au lieu de slice
    const ciphertext = encryptedData.subarray(16);

    const decipher = createDecipheriv('aes-256-ctr', this.encryptionKey, iv);

    return Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]).toString('utf8');
  }
}
