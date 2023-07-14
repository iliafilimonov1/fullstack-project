import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
import { Student } from '../store/StudentStore/types';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
import Drawer from '../components/ui/Drawer/Drawer';
import StudentForm from '../components/ui/StudentForm/StudentForm';
import axios from 'axios';
// import { BiDotsHorizontalRounded } from 'react-icons/bi';

const ExamplePage: React.FC = () => {
  const { studentsStore } = useStores();
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isViewMode, setViewMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students');
        studentsStore.list = response.data;
      } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
      }
    };

    fetchData();
  }, [studentsStore]);

  const handleButtonClick = () => {
    setSelectedStudent(undefined);
    setViewMode(false);
    setDrawerOpen(true);
  };

  const handleDataSubmit = async (data: Student) => {
    const studentData = { ...data };

    if (selectedStudent) {
      await updateStudent(studentData);
    } else {
      await createStudent(studentData);
    }

    setDrawerOpen(false);
    setViewMode(false);
  };

  const createStudent = async (data: Student) => {
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
  };

  const updateStudent = async (data: Student) => {
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
  };

  const handleDropdownOptionSelect = (option: string, student: Student) => {
    if (option === 'Открыть') {
      setSelectedStudent(student);
      setViewMode(true);
      setDrawerOpen(true);
    } else if (option === 'Удалить') {
      handleDeleteClick(student);
    }
  };

  const handleDeleteClick = async (student: Student) => {
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
  };

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
            onDataSubmit={handleDataSubmit}
            // @ts-ignore
            selectedValue={selectedStudent}
            isReadOnly={isViewMode}
          />
        </Drawer>
      )}
      <Button onClick={handleButtonClick} type="submit">
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
