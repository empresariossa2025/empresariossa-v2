import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, IsOptional, IsBoolean, Matches } from 'class-validator';
import { UserRole } from './create-user.dto';

export class UpdateUserDto {
  @ApiProperty({ example: 'user@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'João', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Silva', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

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

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
