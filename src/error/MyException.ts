import { HttpException, HttpStatus } from '@nestjs/common';

export class MyException extends HttpException {
  constructor() {
    // NestJS s'attend à cette structure spécifique
    const responseBody = {
      message: 'You do not have permission to access this resource',
      error: 'Forbidden action',
      statusCode: HttpStatus.FORBIDDEN,
    };

    super('Salut ici erreur', HttpStatus.FORBIDDEN);
  }
}
