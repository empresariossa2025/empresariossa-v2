import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Jantar de Negócios - Setembro 2025' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Encontro de networking para empresários da região', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-09-25T18:30:00.000Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-09-25T21:30:00.000Z' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 'Camarada Camarão - Barra da Tijuca', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;
}
