import { Role } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsAlphanumeric()
  @ApiProperty()
  @MinLength(6)
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  role?: Role;
}
