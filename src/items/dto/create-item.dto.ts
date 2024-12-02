export class CreateItemDto {
    name: string;
    content?: string;
    completed?: boolean;
    listId: number;
}