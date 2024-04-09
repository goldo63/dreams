import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User as UserModel } from './user.schema';
import { IAccount } from '@dreams/shared/models';
import { AccountValidator } from '@dreams/shared/services';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    ) {}

    async getById(id: string): Promise<IAccount | null> {
        this.logger.log(`Finding user by id ${id}`);
    
        const item = await this.userModel.findOne({ id: id }).exec();
    
        if (!item) return null;
        return item;
    }

    async updateById(id: string, user: IAccount): Promise<IAccount | null> {
        this.logger.log(`Updating user by id ${id}`);
        const item = await this.userModel.findOneAndUpdate({ id: id }, user).exec();

        return item;
    }

    async getByUsername(username: string): Promise<IAccount | null> {
        this.logger.log(`Finding user by id ${username}`);
    
        const item = await this.userModel.findOne({ username: +username }).exec();
    
        if (!item) return null;
        return item;
    }

    async addFriend(userId: string, friendId: string): Promise<IAccount | null> {
        this.logger.log(`Adding friend ${userId} to ${friendId}`);

        const user = await this.userModel.findOne({ id: userId }).exec();
        const friend = await this.userModel.findOne({ id: friendId }).exec();

        if (!user ||!friend) return null;

        if( !AccountValidator.isUser(user.accountDetails) ) throw new HttpException('Found user is a company', HttpStatus.BAD_REQUEST,);
        if (user.accountDetails.friends.some(f => f.id === friendId)) throw new HttpException('User already has this friend', HttpStatus.BAD_REQUEST);

        user.accountDetails.friends.push(friend);


        user.markModified('accountDetails');
    
        await user.save();
        return user;
    }
}
