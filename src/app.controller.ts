import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    console.log(req);
    return this.appService.getHello();
  }

  @CacheKey('hello')
  @CacheTTL(20)
  @Get('hello/:id')
  getCustomHello(): string {
    return this.appService.getCustomHello();
  }

  @Get('bonjour/:id')
  getCustomBonjour(@Query() query, @Param() param): string {
    console.log(query, param);
    return this.appService.getCustomHello();
  }

  @Post('message')
  postMessage(@Body() { name }: { name: string }): string {
    return this.appService.postMessage(name);
  }
}
