import type { ReactNode } from 'react';
import type * as CSS from 'csstype';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';

type BaseProps = {
  /** Действие на нажатие клавиши Enter */
  onEnter?: () => void;
  /** ширина */
  width?: number | string;
  /** высота */
  height?: number | string;
  /** цвет фона */
  backgroundColor?: CSS.Property.BackgroundColor;
  /** Стилизация рамки */
  borderClasses?: string;
};

type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type MaskProps = {
/** Формат даты */
  pattern?: string;
  /** Маска */
  mask?: string;
};

export type BaseInputProps = Omit<HTMLInputProps, 'checked' | 'value'>
& BaseProps
& MaskProps
& {
  checked?: boolean | null;
  value?: string | number | null;
  /** Контейнер для постфикса */
  postfix?: ReactNode;
};

export type BaseTextareaProps = Omit<TextareaAutosizeProps, 'value'>
& BaseProps
& {
  minHeight?: string;
  value?: string | null;
  height?: number;
};
