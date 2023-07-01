import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
import { Student } from '../store/StudentStore/types';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
import Drawer from '../components/ui/Drawer/Drawer';
import StudentForm from '../components/ui/StudentForm/StudentForm';
import axios from 'axios';

const ExamplePage: React.FC = () => {
  const { studentsStore } = useStores();
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isFormEmpty, setFormEmpty] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setSelectedStudent(undefined);
    setFormEmpty(true);
    setDrawerOpen(true);
  };

  const handleDataSubmit = (data: Student) => {
    const studentData = { ...data };

    if (selectedStudent) {
      updateStudent(studentData);
    } else {
      createStudent(studentData);
    }

    setDrawerOpen(false);
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

  const handleEditClick = (student: Student) => {
    if (student && selectedStudent) {
      setFormEmpty(false);
      setDrawerOpen(true);
    }
  };

  const handleDeleteClick = (student: Student) => {
    if (student) {
      setDrawerOpen(false);
      deleteStudent(student);
    }
  };

  const deleteStudent = async (student: Student) => {
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

  const handleDropdownClick = () => {
    setDropdownOpen(!isDropdownOpen);
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
            selectedValue={isFormEmpty ? undefined : selectedStudent}
          />
        </Drawer>
      )}
      <Button onClick={handleButtonClick} type="submit">
        Добавить студента
      </Button>
      {!!studentsStore.list?.length && (
        <Table<Student>
          data={studentsStore.list}
          headers={[
            { key: 'name', name: 'Имя', width: 120 },
            { key: 'surname', name: 'Фамилия', width: 120 },
            { key: 'age', name: 'Возраст', width: 120 },
            { key: 'groupName', name: 'Наименование группы', width: 300 },
            { key: 'address', name: 'Адрес' },
          ]}
          onRowEdit={(student) => handleEditClick(student)}
          onRowDelete={(student) => handleDeleteClick(student)}
          isDropdownOpen={isDropdownOpen}
          onDropdownClick={handleDropdownClick}
        />
      )}
    </>
  );
};

export default observer(ExamplePage);
