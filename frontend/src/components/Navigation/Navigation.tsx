import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Globe, User } from 'lucide-react';
import { AiFillFilePdf } from 'react-icons/ai';
import { IoLogoApple } from 'react-icons/io';
import { extractStyles } from '@/services/utils';
import Button from '../ui/Button/Button';
import { NavItem } from './types';

/** Элементы навишации */
const navItems: NavItem[] = [
  { label: 'Home', link: '/', icon: <AiFillFilePdf /> },
  { label: 'Example Page', link: '/ExamplePage' },
  { label: 'Registration Page', link: '/RegistrationForm' },
  { label: 'Framer-motion', link: '/FramerMotion' },
  { label: 'Frameworks', link: '/Frameworks' },
];

/** Компонент панель навигации */
const Navigation: React.FC = () => {
  /** Для маршрутизации */
  const router = useRouter();

  const [activeLink, setActiveLink] = useState<string>();

  const onClickLinkHandler = useCallback((link: string) => {
    router.push(link);
    setActiveLink(link);
  }, []);

  return (
    <header className="shadow bg-white h-16 mx-auto px-5 flex items-center justify-between">
      <IoLogoApple
        onClick={() => router.push('/')}
        size={40}
      />
      <nav className="flex items-center gap-5">
        {navItems.map((item) => (
          <Button
            key={item.link}
            className={
              extractStyles`
                ${item.link === activeLink ? 'bg-slate-100' : ''}
              `
            }
            onClick={() => onClickLinkHandler(item.link)}
            variant="ghost"
          >
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="flex cursor-pointer">
        <Globe />
        <User />
      </div>
    </header>
  );
};

export default React.memo(Navigation);
