import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Функция принимает массив классов,
 * объединяет их с помощью clsx и сопоставляет полученные имена классов с классами Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Функция возвращает строку уникальных классов
 * (отсеивает null, false, undefined, '', лишние пробелы и \n)
 * Шаблонные выражения обязательно следует писать после логического оператора '&&' либо тернарника
 */
export function extractStyles(
  strings: TemplateStringsArray,
  ...exprResults: (string | boolean | undefined)[]
) {
  const rawStyles = strings
    .flatMap((x) => x.split('\n'))
    .flatMap((x) => x.split(' '))
    .map((x) => x.trim())
    .filter(Boolean);
  const result = new Set([...exprResults, ...rawStyles]);

  return Array.from(result).filter(Boolean).join(' ');
}

/** Соединение элементов массива в строку  */
export function joinNonEmpty(arr: unknown[], separator: string = ' '): string {
  return arr.filter(Boolean).join(separator);
}
