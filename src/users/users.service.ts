import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConsoleLogger } from '@nestjs/common';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService, private logger: ConsoleLogger) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: createUserDto,
      });

      this.logger.debug(`User has been created: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany();

      this.logger.debug(`The entire list was retrieved: ${JSON.stringify(users)}`);
      return users;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id
        }
      })

      if(!user) {
        throw new NotFoundException(`The user is not founded`);
      }

      this.logger.debug(`The user with the id ${id} was retrieved: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
