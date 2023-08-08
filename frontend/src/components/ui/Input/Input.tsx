import React, { forwardRef, useCallback } from 'react';
import { extractStyles } from '../../../services/utils'; // for pass tests
import { InputProps } from './types';

export type InputTypes = 'text' | 'number';

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  label,
  value,
  onChange,
  className,
  onBlur,
  placeholder,
  disabled,
  readOnly,
  onClick,
  onKeyDown,
  error,
  postfix,
}, ref) => {
  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const { value: val } = e.target;
      if (onChange) {
        onChange(val);
      }
    }
  }, [onChange]);

  return (
    <div className="flex flex-col">
      {label && (
        <div className={
          extractStyles`
            pb-1
            ${error && 'text-red-600'}
          `
        }
        >
          {label}
        </div>
      )}
      <div className={extractStyles`${error && 'border-red-600 text-red-600'}`}>
        <input
          ref={ref}
          className={`input 
          ${disabled || readOnly ? 'opacity-50 cursor-not-allowed' : ''} 
          ${className || ''}`}
          disabled={disabled}
          id={id}
          onBlur={onBlur}
          onChange={onChangeHandler}
          onClick={onClick}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          type="text"
          value={value || ''}
        />
        {postfix && <div className="w-min h-full">{postfix}</div>}
      </div>
      {error && <div className="text-red-600 break-words text-xs pt-1">{error}</div>}
    </div>

  );
});

Input.displayName = 'Input';
export default React.memo(Input);
