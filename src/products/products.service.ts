import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        discount_price: createProductDto.discount_price,
        price: createProductDto.price,
        user: { connect: { id: createProductDto.userId } },
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: string;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor: {
        id: cursor,
      },
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        discount_price: updateProductDto.discount_price,
        price: updateProductDto.price,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
