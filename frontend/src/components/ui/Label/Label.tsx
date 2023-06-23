import React, { useMemo } from 'react';
import { LabelProps } from './types';

const Label: React.FC<LabelProps> = ({ children, size = 'x' }) => {
  const styles = useMemo(() => {
    switch (size) {
      case 's':
        return 'text-sm';
      case 'm':
        return 'text-md';
      case 'x':
        return 'text-xl';
      default:
        return 'text-lg';
    }
  }, []);

  return <div className={styles}>{children}</div>;
};

Label.displayName = 'Label';

export default React.memo(Label);
