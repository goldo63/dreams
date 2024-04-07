import { IAccount } from '@dreams/shared/models';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){

    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IAccount | null> {
      const result = this.userService.getById(id);

      if (!(await result)) throw new NotFoundException(`Post with id ${id} not found`);
      return result;
    }
}
