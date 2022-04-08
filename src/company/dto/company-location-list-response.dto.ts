import { IsArray, IsNumber, IsString } from 'class-validator';

export class CompanyLocationListResponseDto {
  @IsNumber()
  companyId: number;

  @IsString()
  name: string;

  @IsString()
  field: string;

  @IsNumber()
  level: number;

  @IsArray()
  address: number[];
}
