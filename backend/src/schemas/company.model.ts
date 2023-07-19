import { Schema, Document, model } from 'mongoose';

/**
 * Интерфейс для компании.
 * @interface
 */
export interface Company {
  name: string;
  position: string;
}

/**
 * Тип документа компании.
 * @typedef {Document & Company} CompanyDocument
 */
export type CompanyDocument = Document & Company;

/**
 * Схема компании.
 * @type {Schema<Company>}
 */
export const CompanySchema = new Schema<Company>({
  name: { type: String, required: true },
  position: { type: String, required: true },
});

/**
 * Модель компании.
 * @type {Model<CompanyDocument>}
 */
export const CompanyModel = model<CompanyDocument>('Company', CompanySchema);
