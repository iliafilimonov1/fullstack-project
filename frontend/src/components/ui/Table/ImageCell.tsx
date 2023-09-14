import React from 'react';

export interface ImageCellProps {
  src: string;
  alt?: string;
}

const ImageCell: React.FC<ImageCellProps> = ({ src, alt }) => (
  <div className="flex items-center border border-gray-300">
    <img
      alt={alt}
      className="w-16 h-16 object-cover rounded-full max-w-full min-h-16"
      src={src}
    />
  </div>
);

export default ImageCell;
