import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { HttpExceptionFilter } from 'src/error/Filter';
import { MyException } from 'src/error/MyException';
import { CreateDogDto } from './CreateDogDto';
import { FindOneParams } from './FindOneParams';
import { MyValidationPipe } from 'src/pipe/myValidationPipe';

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

  @Get('valid/:id')
  findValidId(@Param() params: FindOneParams): string {
    const { id } = params;
    console.log(id);
    return `id: ${id}`;
  }

  @Post('add')
  @UsePipes(new MyValidationPipe())
  addDog(@Body() createDogDto: CreateDogDto): string {
    console.log(createDogDto);
    return `id: ${createDogDto.name}`;
  }
}
