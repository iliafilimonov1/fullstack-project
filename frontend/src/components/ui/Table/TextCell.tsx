import React from 'react';

export interface TextCellProps<T> {
  value: T[keyof T] | string;
}

const TextCell = <T,>({ value }: TextCellProps<T>) => {
  return (
    <div className="flex items-center border border-gray-300 flex-grow w-2">
      {String(value)}
    </div>
  );
};

export default TextCell;
