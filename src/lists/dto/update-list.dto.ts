import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { User } from '@prisma/client';
import { Item } from 'src/items/entities/item.entity';

export class UpdateListDto extends PartialType(CreateListDto) {
    name?:           string;
    description?:    string;
    items?:          Item[];
    userId?:         number;
    user?:           User;
    enabled?:        string;
}
