import { extractStyles } from '@/services/utils';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import type { BaseTextareaProps } from './types';

/** Базовый Textarea */
const BaseTextarea = forwardRef<HTMLTextAreaElement, BaseTextareaProps>(({
  onEnter,
  width,
  height = 50,
  backgroundColor = 'transparent',
  borderClasses,
  minRows = 1,
  maxRows,
  cacheMeasurements,
  onHeightChange,
  minHeight,
  ...HTMLTextareaProps
}, ref) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(
    ref,
    () => innerRef.current,
  );

  return (
    <div className={extractStyles`
        flex flex-1
        rounded-main 
        ${HTMLTextareaProps.className}
        ${borderClasses}
      `}
    >
      <TextareaAutosize
        {...HTMLTextareaProps}
        ref={innerRef}
        cacheMeasurements={cacheMeasurements}
        className={extractStyles`
          outline-none px-2
          rounded-main
          w-full
          ${minHeight ? `min-h-${minHeight}` : 'min-h-[50px]'}
          py-1
        `}
        data-slots="_"
        maxRows={maxRows}
        minRows={minRows}
        onHeightChange={onHeightChange}
        onKeyDown={(e) => {
          if (HTMLTextareaProps.onKeyDown) {
            HTMLTextareaProps.onKeyDown(e);
          }
          if (onEnter && e.key === 'Enter') {
            onEnter();
          }
        }}
        style={{
          width,
          height,
          backgroundColor,
        }}
        value={HTMLTextareaProps.value ?? ''}
      />
    </div>
  );
});

BaseTextarea.displayName = 'BaseTextarea';

export default React.memo(BaseTextarea);
