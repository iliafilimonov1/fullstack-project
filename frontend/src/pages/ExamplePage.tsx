import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import useStores from '../hooks/useStores';
import { Student } from '../store/StudentStore/types';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
import Drawer from '../components/ui/Drawer/Drawer';
import StudentForm from '../components/ui/StudentForm/StudentForm';
// import { BiDotsHorizontalRounded } from 'react-icons/bi';

const ExamplePage: React.FC = () => {
  const { studentsStore } = useStores();
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isViewMode, setViewMode] = useState(false);

  useEffect(() => {
    studentsStore.fetch();
  }, [studentsStore]);

  const handleButtonClick = useCallback(() => {
    setSelectedStudent(undefined);
    setViewMode(false);
    setDrawerOpen(true);
  }, []);

  const createStudent = useCallback(async (data: Student) => {
    try {
      const response = await axios.post('http://localhost:3000/students', data);

      if (response.status === 201) {
        const createdStudent = response.data;
        studentsStore.addNewStudent(createdStudent);
      } else {
        console.error('Ошибка при создании студента');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
  }, [studentsStore]);

  const updateStudent = useCallback(async (data: Omit<Student, 'id'>) => {
    if (selectedStudent) {
      try {
        const response = await axios.put(`http://localhost:3000/students/${selectedStudent.id}`, data);

        if (response.status === 200) {
          studentsStore.updateStudent(data);
        } else {
          console.error('Ошибка при обновлении студента');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
      }
    }
  }, [selectedStudent, studentsStore]);

  const handleDataSubmit = useCallback(async (data: Omit<Student, 'id'>) => {
    const studentData = { ...data };

    if (selectedStudent) {
      await updateStudent(studentData);
    } else {
      await createStudent(studentData);
    }

    setDrawerOpen(false);
    setViewMode(false);
  }, [createStudent, selectedStudent, updateStudent]);

  const handleDeleteClick = useCallback(async (student: Student) => {
    try {
      const response = await axios.delete(`http://localhost:3000/students/${student.id}`);

      if (response.status === 200) {
        studentsStore.deleteStudent(student.id);
        setSelectedStudent(undefined);
      } else {
        console.error('Ошибка при удалении студента');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
  }, [studentsStore]);

  const handleDropdownOptionSelect = useCallback((option: string, student: Student) => {
    if (option === 'Открыть') {
      setSelectedStudent(student);
      setViewMode(true);
      setDrawerOpen(true);
    } else if (option === 'Удалить') {
      handleDeleteClick(student);
    }
  }, [handleDeleteClick]);

  return (
    <>
      {isDrawerOpen && (
        <Drawer
          header={selectedStudent ? 'Информация о студенте' : 'Добавление студента'}
          onClose={() => setDrawerOpen(false)}
          position="right"
        >
          <StudentForm
            // @ts-ignore
            isReadOnly={isViewMode}
            onDataSubmit={handleDataSubmit}
            selectedValue={{ title: selectedStudent?.name ?? '', id: selectedStudent?.id ?? '' }}
          />
        </Drawer>
      )}
      <Button
        onClick={handleButtonClick}
        type="submit"
      >
        Добавить студента
      </Button>
      {!!studentsStore.list?.length && (
        <Table
          data={studentsStore.list}
          headers={[
            { key: 'name', name: 'Имя' },
            { key: 'surname', name: 'Фамилия' },
            { key: 'age', name: 'Возраст' },
            { key: 'groupName', name: 'Наименование группы' },
            { key: 'address', name: 'Адрес' },
          ]}
          onDropdownOptionSelect={handleDropdownOptionSelect}
        />
      )}
    </>
  );
};

export default observer(ExamplePage);
