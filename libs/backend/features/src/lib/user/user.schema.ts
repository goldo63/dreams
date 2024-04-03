import { IAccount, ICompany, IUser, Id } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';

export type UserDocument = User & Document;

@Schema()
export class User implements IAccount {
    @Prop({required: true})
    phoneNumber!: string;

    @Prop({required: true, default: Date.now})
    dateOfRegistration!: Date;

    @Prop({type: MongooseSchema.Types.Mixed, required: true})
    accountDetails!: IUser | ICompany;

    @Prop({default: uuid, index: true})
    id!: string;

    @Prop({
        required: true,
        unique: true,
      })
    username!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);