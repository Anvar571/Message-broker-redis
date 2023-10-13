import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({example: 'lorem'})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({example: 'lorem ipsum lalala'})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({example: 'exprenice'})
  @IsNotEmpty()
  @IsString()
  category: string;
}
