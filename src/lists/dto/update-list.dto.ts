import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

export class UpdateListDto extends PartialType(CreateListDto) {
    name?:           string;
    description?:    string;
    items?:          CreateItemDto[];
    enabled?:        string;
}
