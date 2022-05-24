/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class locationApi extends Document {
  @Prop({ required: true })
  type: string;

  @Prop()
  coordinates: number[];
}
export const locationSchema = SchemaFactory.createForClass(locationApi);
@Schema()
export class userQuoteApi extends Document {
  @Prop({ required: true })
   topicId: string;
  @Prop()
   content: string;
  @Prop()
   liked: string[];
  @Prop()
   disliked: string[];
  @Prop()
   isActive: boolean;
}
export const userQuoteSchema = SchemaFactory.createForClass(userQuoteApi);

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  password: string;
  @Prop()
  gender: string;
  @Prop()
  sexualOrientation: string;
  @Prop()
  showMe: string;
  @Prop()
  birthday: Date;
  @Prop()
  phoneNumber: string;
  @Prop()
  isPrivate: boolean;
  @Prop()
  isPhoneVerified: boolean;
  @Prop()
  isActive: boolean;
  @Prop()
  isPremium: boolean;
  @Prop()
  isBanned: boolean;
  @Prop({ type: locationSchema, index: '2dsphere' })
  loc: typeof locationSchema;
  @Prop({type: userQuoteSchema })
  quote: userQuoteApi
  @Prop({default: Date.now()})
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const UserSchema =
  SchemaFactory.createForClass(User);
