/* eslint-disable jsx-a11y/label-has-associated-control */
import { extractStyles } from '@/services/utils';
import React, { useCallback } from 'react';
import { LoadFileProps } from './types';

const LoadFile: React.FC<LoadFileProps> = ({
  callBack,
  title = 'Select file',
  previewFileUrl,
}) => {

  const loadFileHandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (callBack && files?.length) {
      callBack(files);
    }
  }, [callBack]);
  return (
    <div className="bg-gray-300 px-4 py-2 w-full">
      <label
        className={
          extractStyles`
          input-file h-min items-center justify-center
           rounded-md font-bold text-gray-500 text-center
        `
        }
        htmlFor="drop"
      >
        <div className="mb-2">{title}</div>
        <div className="
        flex items-center justify-center font-bold relative overflow-auto hover:opacity-70
        text-gray-500 w-full min-h-[300px] border-dashed border-gray-500 bg-white border-[1px]"
        >
          <input
            id="drop"
            onChange={loadFileHandler}
            type="file"
          />
          { previewFileUrl
              ? (
                <div className="absolute top-0">
                  {previewFileUrl.map((url) => (
                    <img
                      key={url}
                      alt="droppedimage"
                      className="z-0"
                      src={url}
                    />
                  ))}
                </div>
              )
              : <div className="absolute">Drop file...</div>
          }
        </div>
      </label>
    </div>
  );
};

export default React.memo(LoadFile);
