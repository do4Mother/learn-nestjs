import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';
import { User } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validate(login: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: login.username },
    });

    if (!user) {
      throw new NotFoundException(`Username / Password invalid`);
    }

    const validatePass = await bcrypt.compare(login.password, user.password);

    if (!validatePass) {
      throw new NotFoundException(`Username / Password invalid`);
    }

    const authEntity = new AuthEntity({
      accessToken: this.jwtService.sign(user),
    });
    return authEntity;
  }

  validateUser(user: User) {
    return this.prisma.user.findUnique({ where: { username: user.username } });
  }
}
