import {
  Controller,
  ForbiddenException,
  Get,
  UseFilters,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { HttpExceptionFilter } from 'src/error/Filter';
import { MyException } from 'src/error/MyException';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}
  @Get('all')
  @UseFilters(HttpExceptionFilter)
  findAll(): Promise<string[]> {
    throw new MyException();
  }
}
