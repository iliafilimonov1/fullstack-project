import React from 'react';
import { BoxProps } from './types';

const Box:React.FC<BoxProps> = ({
  children,
  footer,
  header,
  headerButtons,
  onClick,
}) => (
  <div
    className="w-full shadow-sm rounded-lg bg-slate-100 hover:shadow-md hover:scale-[1.003] duration-1000 transition-all"
    onClick={onClick}
    data-testid="box"
  >
    {header && (
      <div className="px-6 py-4 border-b-[1px] border-slate-300 flex items-center justify-between">
        <div>{header}</div>
        <div className="flex items-center gap-2 h-[30px]">{headerButtons}</div>
      </div>
    )}
    <div className="px-6 py-4">{children}</div>
    {footer && (
      <div className="px-6 py-4 border-t-[1px] border-slate-300">{footer}</div>
    )}
  </div>
);

Box.displayName = 'Box';

export default React.memo(Box);
