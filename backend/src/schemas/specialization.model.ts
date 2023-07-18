import { Schema, Document } from 'mongoose';

/**
 * Интерфейс специализации.
 */
export interface Specialization extends Document {
  /**
   * Идентификатор специализации.
   * @type {string}
   */
  id: string;

  /**
   * Название специализации.
   * @type {string}
   */
  name: string;
}

/**
 * Схема для модели специализации.
 * @type {import('mongoose').Schema<Specialization>}
 */
export const SpecializationSchema = new Schema<Specialization>({
  name: { type: String, required: true },
});
