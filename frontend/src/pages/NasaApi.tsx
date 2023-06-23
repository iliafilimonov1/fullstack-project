import { useGetPhotosQuery } from '@/store/Nasa/nasaApi';
import React from 'react';

/** Страница с фотками марсохода */
const NasaApi: React.FC = () => {
  const { data } = useGetPhotosQuery();

  return (
    <div className="p-4 grid grid-cols-4 gap-2">
      <div>NASA</div>
      {!!data?.photos.length
        && data?.photos.map(({ img_src, id, earth_date }) => (
          <div
            key={id}
            className="relative hover:scale-110 hover:z-50 transition-all "
          >
            <img
              alt="ph"
              className="w-[400px] h-[380px] rounded-lg"
              src={img_src}
            />
            <div className="absolute z-10 text-white top-4 left-4">
              {earth_date}
            </div>
          </div>
        ))}
    </div>
  );
};

export default React.memo(NasaApi);
