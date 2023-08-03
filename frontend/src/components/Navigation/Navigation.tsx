import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import { IoLogoApple } from 'react-icons/io';
import { extractStyles } from '@/services/utils';
import Button from '../ui/Button/Button';
import { NavItem } from './types';
import authStore from '@/store/AuthStore/AuthStore';

/** Элементы навигации */
const navItems: NavItem[] = [
  { label: 'Home', link: '/', icon: <AiFillFilePdf /> },
];

/** Компонент панель навигации */
const Navigation: React.FC = () => {
  /** Для маршрутизации */
  const router = useRouter();

  const [activeLink, setActiveLink] = useState<string>();

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const onClickLinkHandler = useCallback((link: string) => {
    router.push(link);
  }, [router]);

  const logoutUser = useCallback(async () => {
    try {
      await authStore.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
        <Button
          onClick={logoutUser}
          variant="link"
        >
          Logout
        </Button>
      </div>

    </header>
  );
};

export default React.memo(Navigation);
