import React, { forwardRef, useCallback } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useToggle } from 'usehooks-ts';
import { extractStyles } from '../../../services/utils'; // for pass tests
import { InputProps } from './types';

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
  type = 'text',
}, ref) => {
  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const { value: val } = e.target;
      onChange(val);
    }
  }, [onChange]);

  const [showPassword, toggleShowPassword] = useToggle();

  const inputType = showPassword ? 'text' : type;

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
        <div className="relative flex">
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
            type={inputType}
            value={value || ''}
          />
          {type === 'password' && (
            <div
              className="absolute top-1/2 right-3 -mt-4 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
          {postfix && <div className="w-min h-full">{postfix}</div>}
        </div>

      </div>
      {error && <div className="text-red-600 break-words text-xs pt-1">{error}</div>}
    </div>

  );
});

Input.displayName = 'Input';
export default React.memo(Input);
