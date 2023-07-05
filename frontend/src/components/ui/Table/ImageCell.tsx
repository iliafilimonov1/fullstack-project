import React from 'react';

export interface ImageCellProps {
  src: string;
  alt?: string;
}

const ImageCell: React.FC<ImageCellProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center border border-gray-300">
      <img src={src} alt={alt} className="w-16 h-16 object-cover rounded-full max-w-full min-h-16" />
    </div>
  );
};

export default ImageCell;