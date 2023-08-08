import type { PropsWithChildren } from 'react';

/** Пропсы модального окна */
export interface ModalProps extends PropsWithChildren {
  onClose?: () => void;
  title?: string;
  className?: string;
}
