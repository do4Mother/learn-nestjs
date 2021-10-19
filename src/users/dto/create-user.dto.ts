import { Role } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsAlphanumeric()
  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  role?: Role;
}
