import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import WalnutPreviewFile from '@/components/PreviewFile/PreviewFile';
import { imageSlice } from '@/store/imagestore/ImageSlice';
import CropImage from '@/components/CropImage/CropImage';
import Dropzone from '@/components/ui/Dropzone/Dropzone';

const fileType = ['application/pdf'];

/** Конвертер в PDF */
const ImagesConverter = () => {
  const { file, imageName, imageSize } = useAppSelector((state) => state.imageReducer);
  const { change } = imageSlice.actions;
  const dispatch = useAppDispatch();

  const [error, setError] = useState<boolean>();


  const changeHandler = useCallback((files: File[]) => {
    const selectedFile = files[0];

    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (evt: ProgressEvent<FileReader>) => {
          dispatch(change({
            file: evt.target?.result as string,
            imageName: selectedFile.name,
            imageSize: selectedFile.size.toString(),
          }));
        };
      } else {
        setError(true);
      }
    } else {
      console.log('Please choose file!');
    }
  }, [dispatch, change]);
  
  return (
    <div className="flex flex-col">
      <div className="bg-slate-400">
        <Dropzone onDrop={changeHandler} />
        {error && <div>Необходим файл PDF</div>}
      </div>
      <div className="bg-blue-200">
        <WalnutPreviewFile
          file={(file as string) ?? ''}
          fileName={imageName ?? ''}
          fileSize={imageSize ?? ''}
        />
      </div>
      <div>
        <CropImage file={file} />
      </div>
    </div>
  );
};

export default React.memo(ImagesConverter);
