import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { HttpExceptionFilter } from 'src/error/Filter';
import { CreateDogDto } from './CreateDogDto';
import { FindOneParams } from './FindOneParams';
import { MyValidationPipe } from 'src/pipe/myValidationPipe';
import { Permissions } from 'src/guards/roles';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/guards/role.enum';
import { Claim } from 'src/guards/claim.enum';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}
  @Get('all')
  @UseFilters(HttpExceptionFilter)
  findAll(): Promise<string[]> {
    return this.dogService.findAll();
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

  // @Post('add')
  // @Roles(Role.Admin)
  // @UsePipes(new MyValidationPipe())
  // addDog(@Body() createDogDto: CreateDogDto): string {
  //   console.log(createDogDto);
  //   return `id: ${createDogDto.name}`;
  // }

  @Post('add2')
  @UseGuards(AuthGuard)
  @UsePipes(new MyValidationPipe())
  addDog2(@Body() createDogDto: CreateDogDto): string {
    console.log(createDogDto);
    return `id: ${createDogDto.name}`;
  }

  @Post('add3')
  @Permissions(Claim.READ, Claim.WRITE)
  @UsePipes(new MyValidationPipe())
  addDog3(@Body() createDogDto: CreateDogDto): string {
    console.log(createDogDto);
    return `id: ${createDogDto.name}`;
  }
}
