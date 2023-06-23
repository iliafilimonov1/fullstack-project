import Box from '@/components/ui/Containers/Box/Box';
import { useRouter } from 'next/router';
import React from 'react';
import { BiCrop } from 'react-icons/bi';
import { RxAvatar } from 'react-icons/rx';

const PREFIX = 'Frameworks';

const frameworks = [
  {
    link: 'ReactImageCrop',
    name: 'React-Image-Crop',
    description: 'Библиотека для обрезания изображений',
    icon: <BiCrop size={50} />,
  },
  {
    link: 'ReactAvatarEdit',
    name: 'React-Avatar-Edit',
    description: 'Библиотека для редактирования автарки',
    icon: <RxAvatar size={50} />,
  },
].map((f) => ({
  ...f,
  link: `/${PREFIX}/${f.link}`,
}));

const Frameworks: React.FC = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 gap-4">
      {frameworks.map((framework) => (
        <Box
          key={framework.name}
          onClick={() => router.push(framework.link)}
        >
          <div className="flex items-start gap-2">
            <div>{framework.icon}</div>
            <div>{framework.description}</div>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default Frameworks;
