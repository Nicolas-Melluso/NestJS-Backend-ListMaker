import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll() {
    return `This action returns all lists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
