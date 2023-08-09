import type { PropsWithChildren, ReactEventHandler } from 'react';
import React, { forwardRef } from 'react';
import { extractStyles } from '@/services/utils';

type ModalPanelProps = PropsWithChildren & {
  duration?: number;
  className?: string;
  children?: React.ReactNode;
  onClick?: ReactEventHandler<HTMLDivElement>;
};

const ModalPanel = forwardRef<HTMLDivElement, ModalPanelProps>(({
  children,
  className,
  duration,
  onClick,
}, ref) => (
  <div
    ref={ref}
    className={extractStyles`
    p-4 bg-white rounded-md w-96 h-96
      ${className}
    `}
    onClick={onClick}
    style={duration ? { transitionDuration: `${duration}ms` } : undefined}
  >
    {children}
  </div>
));
ModalPanel.displayName = 'ModalPanel';

export default React.memo(ModalPanel);
