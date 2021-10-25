import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(12)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty({ required: false })
  discount_price: number;

  @IsOptional()
  userId: number;
}
