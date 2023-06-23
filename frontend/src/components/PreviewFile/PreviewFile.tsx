/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Viewer, Worker, Plugin } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { PreviewFileProps } from './types';

const newPlugin = defaultLayoutPlugin();

const PreviewFile: React.FC<PreviewFileProps> = ({ file, fileName, fileSize }) => 
    (
      <div className="bg-slate-50">

        <div className="w-full h-screen flex justify-between bg-slate-400">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
            {file && (
              <div className="w-[75vw] h-[80vh] overflow-hidden">
                <Viewer
                  fileUrl={file}
                  plugins={[newPlugin as Plugin]}
                />
              </div>
            )}

          </Worker>
          <div className="w-20 h-20 bg-slate-500">
            <div>{fileName}</div>
            <div>{fileSize}</div>
          </div>
        </div>
      </div>
    );

export default React.memo(PreviewFile);
