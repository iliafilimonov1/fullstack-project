import { AxiosResponse } from 'axios';
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

// Полезные функции которые надо бы сохранить
/** Функция из swagger, возвращает наименование файла */
export function extractFileNameFromContentDispositionHeader(value: string) {
  const patterns = [
    /filename\*=[^']+'\w*'"([^"]+)";?/i,
    /filename\*=[^']+'\w*'([^;]+);?/i,
    /filename="([^;]*);?"/i,
    /filename=([^;]*);?/i,
  ];

  let responseFilename = <RegExpExecArray | null>{};
  patterns.some((regex) => {
    responseFilename = regex.exec(value);
    return responseFilename !== null;
  });

  if (responseFilename !== null && responseFilename.length > 1) {
    try {
      return decodeURIComponent(responseFilename[1]);
    } catch (e) {
      console.error(e);
    }
  }
  return null;
}

/** Метод для выгрузки файла */
export const downloadFile = (response: AxiosResponse) => {
  const disposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
  const responseFileName = extractFileNameFromContentDispositionHeader(disposition);

  const url = URL.createObjectURL(response.data);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = responseFileName ?? 'Документ';
  anchor.click();

  URL.revokeObjectURL(url);
};

/** Сериалайзер запроса для Axios */
export const paramsSerializer = (
  request: Record<string, unknown>,
): string => Object.entries(request)
  .filter(([key, value]) => {
    if (value === false) {
      return !!key;
    }

    return key && value;
  })
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.reduce<string>((acc, el, currentIndex) => {
        if (currentIndex === 0) {
          return `${key}=${el}`;
        }
        return `${acc}&${key}=${el}`;
      }, '');
    }
    return `${key}=${value}`;
  })
  .reduce<string>((acc, el, currentIndex) => {
  if (currentIndex === 0) {
    return el;
  }
  return `${acc}&${el}`;
}, '');
