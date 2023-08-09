import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { cn } from '@/services/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'negative' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  prefix?: ReactNode;
  suffix?: ReactNode;
  icon?: ReactNode;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  prefix,
  suffix,
  icon,
  isLoading,
  children,
  disabled,
}) => {
  const buttonClasses = cn(
    'rounded inline-flex items-center justify-center',
    className,
    {
      'py-2 px-2': size === 'md',
      'py-3 px-3 text-sm': size === 'sm',
      'py-4 px-4 text-lg': size === 'lg',
      'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900': variant === 'primary',
      'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100': variant === 'secondary',
      'bg-red-500 hover:bg-red-600 text-white': variant === 'negative',
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-500 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent': variant === 'ghost',
      'bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent':
        variant === 'link',
      'opacity-50 cursor-not-allowed': disabled,
    },
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      type="button"
    >
      {isLoading && <BiLoaderAlt className="animate-spin cursor-not-allowed" />}
      {!isLoading && (
        <>
          {prefix && <span className="mr-2">{prefix}</span>}
          {icon}
          {children}
          {suffix && <span className="ml-2">{suffix}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
