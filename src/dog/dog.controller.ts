import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DogService } from './dog.service';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}
  @Get('all')
  findAll(): Promise<string[]> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
