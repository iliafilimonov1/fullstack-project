import { extractStyles } from '@/services/utils';
import type { PropsWithChildren } from 'react';
import React, { forwardRef } from 'react';

type ModalLayoutProps = PropsWithChildren & {
  duration?: number;
  className?: string;
};

const ModalLayout = forwardRef<HTMLDivElement, ModalLayoutProps>(({
  children,
  className,
  duration,
}, ref) => (
  <div
    ref={ref}
    className={extractStyles`
      m-auto p-4 bg-white rounded-xl opacity-100
      ${className}
    `}
    style={duration ? { transitionDuration: `${duration}ms` } : undefined}
  >
    {children}
  </div>
));
ModalLayout.displayName = 'ModalLayout';

export default React.memo(ModalLayout);
