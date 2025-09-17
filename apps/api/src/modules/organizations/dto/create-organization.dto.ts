import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Matches } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Empresários SA Barra da Tijuca' })
  @IsString()
  name: string;

  @ApiProperty({ example: '12345678000195' })
  @IsString()
  @Matches(/^[0-9]{14}$/, { message: 'CNPJ must contain exactly 14 numbers' })
  cnpj: string;

  @ApiProperty({ example: 'contato@empresariossa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '21999999999' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Av. das Américas, 500' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Rio de Janeiro' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'RJ' })
  @IsString()
  state: string;

  @ApiProperty({ example: '22640100' })
  @IsString()
  @Matches(/^[0-9]{8}$/, { message: 'ZIP code must contain exactly 8 numbers' })
  zipCode: string;
}
