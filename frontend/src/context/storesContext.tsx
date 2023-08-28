import React from 'react';
import StudentsStore from '@/store/StudentsStore/StudentsStore';
import AuthStore from '@/store/AuthStore/AuthStore';

/** Создаем контекст сущностей (синглтон) для дальнейшей работы с ними */
const storesContext = React.createContext({
  studentsStore: new StudentsStore(),
  authStore: new AuthStore(),
});

export default storesContext;
