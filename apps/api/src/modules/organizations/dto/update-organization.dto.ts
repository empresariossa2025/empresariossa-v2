import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, Matches } from 'class-validator';

export class UpdateOrganizationDto {
  @ApiProperty({ example: 'Empresários SA Barra da Tijuca', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'contato@empresariossa.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '21999999999', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Av. das Américas, 500', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Rio de Janeiro', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'RJ', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: '22640100', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{8}$/, { message: 'ZIP code must contain exactly 8 numbers' })
  zipCode?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
