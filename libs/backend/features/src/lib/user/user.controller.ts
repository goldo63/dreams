import { IAccount } from '@dreams/shared/models';
import { Controller, Get, Put, NotFoundException, Param, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){

    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IAccount | null> {
      const result = this.userService.getById(id);
      if (!(await result)) throw new NotFoundException(`User with id ${id} not found`);
      return result;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: IAccount): Promise<IAccount | null> {
      const result = this.userService.updateById(id, user);
      if (!(await result)) throw new NotFoundException(`User with id ${id} not found`);
      return result;
    }

    @Post(':id/friends/:friendId')
    async addFriend(@Param('id') userId: string, @Param('friendId') friendId: string): Promise<IAccount | null> {
      const result = this.userService.addFriend(userId, friendId);
      if (!(await result)) throw new NotFoundException(`User with id ${userId} not found`);
      return result;
    }
}
