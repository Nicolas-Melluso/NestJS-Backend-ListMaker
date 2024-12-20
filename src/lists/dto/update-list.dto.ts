import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { IsOptional, IsString, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto extends PartialType(CreateListDto) {
    @IsOptional()
    @IsString()
    name?:           string;

    @IsOptional()
    @IsString()
    description?:    string;

    @IsOptional()
    @IsArray()
    items?:          CreateItemDto[];

    @IsBoolean()
    @IsOptional()
    readonly enabled?: boolean;
}