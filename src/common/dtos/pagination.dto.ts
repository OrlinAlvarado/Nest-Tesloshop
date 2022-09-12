import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'Rows to retrieve',
    })
    @IsOptional()
    @IsPositive()
    @Type( () =>  Number )
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'Rows to skip',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type( () =>  Number )
    offset?: number;
}