import React, { useCallback, useState, useEffect } from 'react';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { SelectOption } from '@/components/ui/Select/types';
import Select from '@/components/ui/Select/Select';

export interface FormData {
  name?: string;
  surname?: string;
  address?: string;
  age?: number;
  groupName?: string;
}

export interface StudentFormProps {
  selectedValue?: SelectOption;
  onDataSubmit?: (data: FormData) => void;
  isReadOnly?: boolean;
}

const options = [
  { id: '1', title: 'Frontend-321' },
  { id: '2', title: 'Frontend-322' },
  { id: '3', title: 'Frontend-323' },
];

const StudentForm: React.FC<StudentFormProps> = ({ selectedValue, onDataSubmit, isReadOnly }) => {
  const [data, setData] = useState<FormData>({});

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      ...selectedValue,
    }));
  }, [selectedValue]);

  const onInputHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    if (!isReadOnly) {
      const target = e.target as HTMLInputElement;
      setData((prevData) => ({
        ...prevData,
        [target.id as keyof FormData]: target.value,
      }));
    }
  }, [isReadOnly]);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData: FormData = { ...data };
    if (selectedValue && selectedValue.title) {
      formData.groupName = selectedValue.title;
    }
    onDataSubmit?.(formData);
    setData({});
  };

  return (
    <form action="#" onInput={onInputHandler} onSubmit={onSubmitHandler}>
      <Input
        className="mb-2"
        id="name"
        label="Your name"
        value={data.name || ''}
        readOnly={isReadOnly}
      />
      <Input
        className="mb-2"
        id="surname"
        label="Your surname"
        value={data.surname || ''}
        readOnly={isReadOnly}
      />
      <Input
        className="mb-2"
        id="address"
        label="Your address"
        value={data.address || ''}
        readOnly={isReadOnly}
      />
      <Input
        className="mb-2"
        id="age"
        label="Your age"
        value={data.age?.toString() || ''}
        readOnly={isReadOnly}
      />
      <Select
        className="mb-2"
        label="Group name"
        onSelect={(option) => setData({ ...data, groupName: option?.title })}
        options={options}
        selectedOption={selectedValue}
        disabled={isReadOnly}
      />
      {!isReadOnly && (
        <Button type="submit">Submit form</Button>
      )}
    </form>
  );
};

export default StudentForm;
