import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListsService {

  constructor(private prismaService: PrismaService, private logger: ConsoleLogger) {}
  
  async create(createListDto: CreateListDto) {
    try {
      const userExist = await this.prismaService.user.findFirst({
        where: { 
          id: createListDto.userId,
          enabled: true
        }
      });

      if(!userExist) {
        throw new NotFoundException(`The user is not founded`);
      }
      
      const list = await this.prismaService.list.create({
        data: {
          name: createListDto.name,
          description: createListDto.description,
          userId: createListDto.userId
        }
      });

      this.logger.debug(`List has been created: ${JSON.stringify(list)}`);
      return list;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }

  async findAll() {

    try {
      const lists = await this.prismaService.list.findMany({
        where: {
          enabled: true
        }
      });
      
      if (lists.length === 0) {
        return "There isn't nothing yet";
      }

      return lists;
    } catch (error) {
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {

      const list = await this.prismaService.list.findFirst({
        where: {
          id,
          enabled: true
        }
      });

      if (list === null) {
        throw new NotFoundException('User is not enabled or not exist');
      }

      return list;
    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error
      }

      throw new Error(`An error has ocurred: ${error.message}`);
    }
  }

  async update(id: number, updateListDto: UpdateListDto) {
    try {
      const listExist = await this.findOne(id);

      if(!listExist) {
        throw new NotFoundException(`The list is not updated because was not founded`);
      }

      const listUpdated = await this.prismaService.list.update({
        where: { id },
        data: {
          name: updateListDto.name,
          description: updateListDto.description
        }
      });

      this.logger.debug(`The list with the id ${id} was updated: ${JSON.stringify(listUpdated)}`);

      return listUpdated;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const listExist = await this.findOne(id);

      if(!listExist) {
        throw new NotFoundException(`The list is already removed`);
      }

      const listRemoved = await this.prismaService.list.update({
        where: { id },
        data: {
          enabled: false
        }
      });

      this.logger.debug(`The list with the id ${id} was removed: ${JSON.stringify(listRemoved)}`);

      return listRemoved;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }
}
