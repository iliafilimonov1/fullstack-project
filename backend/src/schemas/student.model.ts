import { Schema, Document } from 'mongoose';

export interface Student extends Document {
  name: string;
  surname: string;
  groupName?: string;
  address?: string;
  age?: number;
}

export const StudentSchema = new Schema<Student>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  groupName: { type: String, required: false },
  address: { type: String, required: false },
  age: { type: Number, required: false },
});
