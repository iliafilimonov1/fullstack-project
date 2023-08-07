import React from 'react';
import Navigation from '../components/Navigation/Navigation';

/** Обертка главной страницы */
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navigation />
    <div className="p-4">{children}</div>
  </>
);

export default React.memo(MainLayout);
