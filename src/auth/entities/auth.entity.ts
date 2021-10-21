import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  constructor({ accessToken }) {
    this.accessToken = accessToken;
  }

  @ApiProperty()
  accessToken: string;
}
