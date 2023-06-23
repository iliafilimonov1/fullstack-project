import ReactPdf from '@/components/ReactPdf/ReactPdf';
import React, { useCallback, useState } from 'react';
import Dropzone from '@/components/ui/Dropzone/Dropzone';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { imageSlice } from '@/store/imagestore/ImageSlice';
import CropImage from '@/components/CropImage/CropImage';


const ReactPdfPage: React.FC = () => {
  const { file } = useAppSelector((state) => state.imageReducer);
  const { change } = imageSlice.actions;
  const dispatch = useAppDispatch();

  const [cropImage, setCropImage] = useState<string>();

  const onDropHandler = useCallback((value: File[]) => {
    const urlFile = URL.createObjectURL(value[0]);
    dispatch(change({
      file: urlFile,
    }));
  }, [dispatch]);

  return (
    <div>
      <Dropzone onDrop={onDropHandler} />
      <ReactPdf
        onConvert={(url) => setCropImage(url)}
        pdfFileUrl={file}
      />
      <CropImage
        file={cropImage}
      />
    </div>
  );
};

export default React.memo(ReactPdfPage);
