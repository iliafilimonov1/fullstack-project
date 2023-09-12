import React from 'react';
import { extractStyles } from '@/services/utils';

interface Props {
  value: boolean;
  onChange: (value: boolean)=> void;
}

const Checkbox: React.FC<Props> = ({ onChange, value }) => (
  <div
    className="w-[10px] h-[10px] p-[1px] rounded-full border-[1px] flex justify-center items-center"
    onClick={() => onChange(!value)}
  >
    <div className={extractStyles`\w-full h-full rounded-full ${value && 'bg-red-900'}`} />
  </div>
);

Checkbox.displayName = 'Checkbox';

export default React.memo(Checkbox);
