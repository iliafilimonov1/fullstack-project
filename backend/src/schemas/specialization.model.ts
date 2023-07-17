import { Schema, Document } from 'mongoose';

export interface Specialization extends Document {
  id: string;
  name: string;
}

export const SpecializationSchema = new Schema<Specialization>({
  name: { type: String, required: true },
});
