import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'; // les request viennent de supertest
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { DogModule } from 'src/dog/dog.module';
import { DogService } from 'src/dog/dog.service';

describe('DogController (e2e)', () => {
  let app: INestApplication<App>;
  let dogService = { findAll: () => ['Oly'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DogModule],
    })
      .overrideProvider(DogService)
      .useValue(dogService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/dog/findAll (GET)', async () => {
    const spy = jest
      .spyOn(dogService, 'findAll')
      .mockImplementation(() => ['Oly']);
    await request(app.getHttpServer())
      .get('/dog/all')
      .expect(200)
      .expect(['Oly']);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
