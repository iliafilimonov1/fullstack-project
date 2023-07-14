import { Schema, Document } from 'mongoose';

// Интерфейс представляющий модель студента в бд
export interface Student extends Document {
  name: string;
  surname: string;
  groupName?: string;
  address?: string;
  age: number;
}

// Схема для модели студента в бд
export const StudentSchema = new Schema<Student>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  groupName: { type: String, required: false },
  address: { type: String, required: false },
  age: { type: Number, required: false },
});
