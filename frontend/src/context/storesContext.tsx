import React from 'react';
import StudentsStore from '@/store/StudentsStore/StudentsStore';

/** Создаем контекст сущностей (синглтон) для дальнейшей работы с ними */
const storesContext = React.createContext({
  studentsStore: new StudentsStore(),
});

export default storesContext;
