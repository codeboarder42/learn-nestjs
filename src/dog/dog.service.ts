import { Inject, Injectable } from '@nestjs/common';
import { ALL_DOG } from './bdd';
import { ModuleRef } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { BirdService } from 'src/bird/bird.service';
import database from 'src/environement/database';

@Injectable()
export class DogService {
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(database.KEY)
    private dbConfig: ConfigType<typeof database>,
  ) {}
  findAll(): Promise<string[]> {
    const birdService = this.moduleRef.create(BirdService);
    const databaseHost = this.dbConfig.host;
    return Promise.resolve(ALL_DOG);
  }
}
