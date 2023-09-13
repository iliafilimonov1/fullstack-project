import React from 'react';
import useToggle from 'usehooks-ts/dist/esm/useToggle/useToggle';
import { extractStyles } from '@/services/utils';

/** Свитчер */
const Switcher: React.FC = () => {
  const [toggle, setToggle] = useToggle();

  return (
    <div
      className=" w-[60px] h-[25px] rounded-full overflow-hidden"
      onClick={setToggle}
    >
      <div className={
        extractStyles`switcher
          ${toggle ? 'border-l-[60px]' : 'border-r-[60px]'}
        `
      }
      >
        <div className="w-[50px] h-full rounded-full bg-gray-100 shadow-inner" />
      </div>
    </div>
  );
};

Switcher.displayName = 'Switcher';

export default React.memo(Switcher);
