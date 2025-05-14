import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogController } from './dog/dog.controller';
import { DogService } from './dog/dog.service';
import { BirdModule } from './bird/bird.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { typeOrmModuleOptions } from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { DogModule } from './dog/dog.module';

@Module({
  imports: [
    BirdModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          stores: [createKeyv('redis://localhost:6666')],
        };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    DogModule,
  ],
  controllers: [AppController, DogController],
  providers: [AppService, DogService],
})
export class AppModule {}
