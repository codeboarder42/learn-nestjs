import { Injectable } from '@nestjs/common';
import { ALL_DOG } from './bdd';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BirdService } from 'src/bird/bird.service';

interface EnvironmentVariables {
  DATABASE_KEY: string;
  DATABASE_PORT: number;
}

@Injectable()
export class DogService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private configService: ConfigService<EnvironmentVariables>, // ConfigService
  ) {}
  findAll(): Promise<string[]> {
    const birdService = this.moduleRef.create(BirdService);
    const databaseKey = this.configService.get('DATABASE_KEY', { infer: true });
    return Promise.resolve(ALL_DOG);
  }
}
