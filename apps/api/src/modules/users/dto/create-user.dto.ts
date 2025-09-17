import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, IsOptional, MinLength, Matches } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'João' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Silva' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '12345678901', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{11}$/, { message: 'CPF must contain exactly 11 numbers' })
  cpf?: string;

  @ApiProperty({ example: '12345678000195', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{14}$/, { message: 'CNPJ must contain exactly 14 numbers' })
  cnpj?: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
