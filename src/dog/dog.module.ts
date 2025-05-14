import { forwardRef, Module } from '@nestjs/common';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { BirdModule } from 'src/bird/bird.module';

@Module({
  controllers: [DogController],
  providers: [DogService],
  exports: [DogService],
  imports: [forwardRef(() => BirdModule)],
})
export class DogModule {}
