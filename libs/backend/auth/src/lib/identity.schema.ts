import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import isEmail from 'validator';
import { v4 as uuid } from 'uuid';

export type IdentityDocument = Identity & Document;

@Schema()
export class Identity {

  @Prop({default: uuid, index: true})
    id!: string;

  @Prop({
    required: true,
    unique: true,
  })
  username!: string;

  @Prop({ required: true })
  hash!: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
