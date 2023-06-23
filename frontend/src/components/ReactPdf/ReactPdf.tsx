import React, { useCallback, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ReactPDFProps } from './types';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ReactPdf: React.FC<ReactPDFProps> = ({ pdfFileUrl, onConvert }) => {

  const handleConvertClick = useCallback(async (file: string) => {
    try {
      const pdf = await pdfjs.getDocument(file).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context as CanvasRenderingContext2D, viewport }).promise;
      const imgUrl = canvas.toDataURL('image/jpeg');
      onConvert?.(imgUrl ?? '');
    } catch (error) {
      console.error(error);
      alert('An error occurred while converting the PDF to JPEG');
    }
  }, [pdfjs, document]);

  useEffect(() => {
    if (pdfFileUrl) {
      handleConvertClick(pdfFileUrl);
    }
  }, [pdfFileUrl]);

  return null;
};

export default React.memo(ReactPdf);
