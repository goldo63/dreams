import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import isEmail from 'validator';

export type IdentityDocument = Identity & Document;

@Schema()
export class Identity {

    @Prop({
    required: true,
    unique: true,
  })
  username!: string;

    @Prop({ required: true })
  hash!: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
