import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
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

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): string {
    console.log(id);
    return `id: ${id}`;
  }

  @Get('prime/:id')
  findByIdPrime(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.FORBIDDEN,
      }),
    )
    id: number,
  ): string {
    console.log(id);
    return `idPrime: ${id}`;
  }
}
