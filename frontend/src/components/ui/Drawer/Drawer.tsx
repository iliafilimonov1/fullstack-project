import { extractStyles } from '@/services/utils';
import React, {
  useCallback, useMemo, useState,
} from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { GrClose } from 'react-icons/gr';

export interface DrawerProps {
  children?: React.ReactNode;
  onClose: () => void;
  position?: 'right' | 'left';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/** Всплывающее меню */
const Drawer: React.FC<DrawerProps> = ({
  children,
  onClose,
  position = 'left',
  header,
  footer,
}) => {
  /** Позиция drawer (слева/справа) */
  const translate = useMemo(() => (position === 'left' ? 'translate-x-[-100%]' : 'translate-x-full'), [position]);

  const [localIsOpen, setLocalIsOpen] = useState(false);

  useEffectOnce(() => {
    setTimeout(() => {
      setLocalIsOpen(true);
    }, 0);
  });

  /** Хитровыебанное закрытие */
  const closeHandler = useCallback(() => {
    setLocalIsOpen(false);
    setTimeout(() => {
      onClose?.();
    }, 400);
  }, [onClose]);

  return (
    <main
      className={
        extractStyles`
          fixed overflow-hidden z-10 inset-0 transform ease-in-out transition-all
          ${localIsOpen ? 'bg-gray-900 bg-opacity-25' : ''}
        `
      }
    >
      <section
        className={
          extractStyles`
            absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform
            ${localIsOpen ? 'translate-x-0' : translate}
            ${position === 'left' ? 'left-0' : 'right-0'}
          `
        }
      >
        <article className="relative min-w-[500px] pb-10 flex flex-col overflow-y-auto h-full">
          <header className="px-4 py-4 font-bold text-lg flex items-center justify-between border border-b-gray-200">
            <div>
              {header}
            </div>
            <GrClose
              className="hover:opacity-50 cursor-pointer"
              onClick={closeHandler}
            />
          </header>
          <div className="px-4 py-4">
            {children}
          </div>
          <footer>{footer}</footer>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={closeHandler}
      />
    </main>
  );
};

export default React.memo(Drawer);
