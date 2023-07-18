import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { ManagerDto } from '../dtos/manager.dto';

@Schema()
export class Manager extends User {
  save(): Manager | PromiseLike<Manager> {
    throw new Error('Method not implemented.');
  }
  /**
   * Конструктор класса Manager.
   * @param {ManagerDto} managerDto - dto менеджера.
   */
  constructor(managerDto: ManagerDto) {
    super(managerDto);
    this.departmentName = managerDto.departmentName;
    this.position = managerDto.position;
    this.subordinates = managerDto.subordinates;
  }

  /**
   * Название отдела, к которому относится менеджер.
   * @type {string}
   */
  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentName: string;

  /**
   * Должность менеджера.
   * @type {string}
   */
  @Prop()
  position: string;

  /**
   * Подчиненные менеджеру.
   * @type {User[]}
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  subordinates: User[];
}

/**
 * Схема для модели Manager.
 * @type {import('mongoose').Schema<Manager>}
 */
export const ManagerSchema = SchemaFactory.createForClass(Manager);
