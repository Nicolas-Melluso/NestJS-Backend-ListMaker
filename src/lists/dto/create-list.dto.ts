import { Item } from "src/items/entities/item.entity";
import { User } from "src/users/entities/user.entity";

export class CreateListDto {
    name:           string;
    description?:   string;
    items:          Item[];
    userId:         number;
    user:           User;
}
