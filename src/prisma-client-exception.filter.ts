import { Prisma } from '.prisma/client';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    switch (exception.code) {
      case 'P2002':
        let msg = 'Username is already exists';
        if (exception.message.includes('email')) {
          msg = 'Email is already exists';
        }
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: msg,
        });
        break;

      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: `There is no data with id ${request.params.id}`,
        });
        break;

      default:
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `There is some error with server - ${exception.code}`,
        });
        break;
    }
  }
}
