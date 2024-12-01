import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule, ListsModule, ItemsModule],
})
export class AppModule {}