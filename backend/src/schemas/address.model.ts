import { Schema, Document, model } from 'mongoose';

/**
 * Интерфейс для адреса пользователя.
 * @interface
 */
export interface IAddress {
  street: string;
  suite: string;
  city: string;
}

/**
 * Тип документа для адреса пользователя.
 * @typedef {Document & IAddress} AddressDocument
 */
export type AddressDocument = Document & IAddress;

/**
 * Схема для адреса пользователя.
 * @type {Schema<IAddress>}
 */
export const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  suite: { type: String, required: true },
  city: { type: String, required: true },
});

/**
 * Модель для адреса пользователя.
 * @type {Model<AddressDocument>}
 */
export const AddressModel = model<AddressDocument>('Address', AddressSchema);
