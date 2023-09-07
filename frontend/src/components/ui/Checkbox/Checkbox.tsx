import React from 'react';

interface Props {
  value?: boolean;
  onChange?: (value: boolean)=> void;
}

const Checkbox: React.FC<Props> = () => (
  <div className="w-[10px] h-[10px] p-[1px] rounded-full border-[1px] flex justify-center items-center">
    <div className="w-full h-full rounded-full bg-red-900" />
  </div>
);

Checkbox.displayName = 'Checkbox';

export default React.memo(Checkbox);
