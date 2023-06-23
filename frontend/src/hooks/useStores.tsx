import storesContext from '@/context/storesContext';
import React from 'react';

/** Хук который просто возвращает контекст в котором лежат все проинициализированные сущности */
const useStores = () => React.useContext(storesContext);

export default useStores;
