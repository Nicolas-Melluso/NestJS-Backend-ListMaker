import { ConsoleLogger, Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ListsController],
  providers: [ListsService, PrismaService, ConsoleLogger],
})
export class ListsModule {}
