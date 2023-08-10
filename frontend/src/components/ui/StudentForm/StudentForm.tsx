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
  onDataSubmit?: (data: FormData) => void | Promise<void>;
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
    <form
      action="#"
      onInput={onInputHandler}
      onSubmit={onSubmitHandler}
    >
      <Input
        className="mb-2"
        id="name"
        label="Your name"
        readOnly={isReadOnly}
        value={data.name || ''}
      />
      <Input
        className="mb-2"
        id="surname"
        label="Your surname"
        readOnly={isReadOnly}
        value={data.surname || ''}
      />
      <Input
        className="mb-2"
        id="address"
        label="Your address"
        readOnly={isReadOnly}
        value={data.address || ''}
      />
      <Input
        className="mb-2"
        id="age"
        label="Your age"
        readOnly={isReadOnly}
        value={data.age?.toString() || ''}
      />
      <Select
        className="mb-2"
        defaultValue={options[0]}
        disabled={isReadOnly}
        label="Group name"
        onSelect={(option) => setData({ ...data, groupName: option?.title })}
        options={options}
        selectedOption={selectedValue}
      />
      {!isReadOnly && (
        <Button type="submit">Submit form</Button>
      )}
    </form>
  );
};

export default StudentForm;
