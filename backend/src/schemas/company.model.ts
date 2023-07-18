import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CompanyModel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  position: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyModel);
