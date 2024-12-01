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
      const users = await this.prismaService.user.findMany({
        where: {
          enabled: true
        }
      });

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
          id,
          enabled: true
        }
      });

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

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userExist = await this.findOneById(id);

      if(!userExist) {
        throw new NotFoundException(`The user is not updated because was not founded`);
      }

      const userUpdated = await this.prismaService.user.update({
        data: updateUserDto,
        where: { id }
      });

      this.logger.debug(`The user with the id ${id} was updated: ${JSON.stringify(userUpdated)}`);
      return userUpdated;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }

  //This is a soft delete, we don't lose information until memory explodes
  async remove(id: number) {
    try {
      const userExist = await this.findOneById(id);

      if(!userExist) {
        throw new NotFoundException(`The user is not deleted because was not founded`);
      }

      const userDisabled = userExist;
      userDisabled.enabled = false;

      const userSoftDeleted = await this.prismaService.user.update({
        data: userDisabled,
        where: { id }
      });

      this.logger.debug(`The user with the id ${id} was deleted: ${JSON.stringify(userSoftDeleted)}`);
      return userSoftDeleted;
    } catch (error) {
      this.logger.error(`This error is happend: ${error}`);

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw Error(`An error has ocurred: ${error.message}`);
    }
  }
}
