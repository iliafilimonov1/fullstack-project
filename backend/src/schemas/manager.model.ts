import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Document, Types } from 'mongoose';

@Schema()
export class Manager extends User {
  /**
   * Отдел, в котором работает менеджер.
   */
  @Prop({ required: true })
  department: string;

  /**
   * Занимаемая должность менеджера.
   */
  @Prop({ required: true })
  position: string;

  /**
   * Список подчиненных сотрудников.
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  subordinates: UserDocument[];
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
