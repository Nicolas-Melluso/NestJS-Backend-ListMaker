import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [UsersModule, ListsModule],
})
export class AppModule {}