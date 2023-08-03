import { SetMetadata } from '@nestjs/common';

/**
 * Декоратор для пометки методов контроллера как публичных (незащищенных).
 */
export const Public = () => SetMetadata('isPublic', true);
