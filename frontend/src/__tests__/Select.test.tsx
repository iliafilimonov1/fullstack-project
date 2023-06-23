import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from '../components/ui/Select/Select';
import { SelectOption } from '../components/ui/Select/types';

describe('Select', () => {
  const options: SelectOption[] = [
    { id: '1', title: 'Option 1' },
    { id: '2', title: 'Option 2' },
    { id: '3', title: 'Option 3' },
  ];


  it('should open the dropdown when clicked', () => {
    const { getByRole } = render(
      <Select
        onSelect={() => { }}
        options={options}
        selectedOption={undefined}
      />
    );

    const selectButton = getByRole('textbox', { name: '' });

    fireEvent.click(selectButton); // Клик по селекту

    expect(getByRole('list')).toBeInTheDocument(); // Проверка наличия выпадающего списка
  });


  it('should select the option when clicked', () => {
    const handleSelect = jest.fn(); // Объявление мок-функции

    const { getByRole, getByText } = render(
      <Select
        onSelect={handleSelect}
        options={options}
        selectedOption={undefined}
      />
    );

    const selectButton = getByRole('textbox', { name: '' });

    fireEvent.click(selectButton); // Клик по селекту

    const option = getByText('Option 2');

    fireEvent.click(option); // Клик по "Option 2"

    expect(handleSelect).toHaveBeenCalledWith(options[1]); // Проверка вызова обработчика с правильным значением
  });


  it('should navigate up and down with arrow keys', () => {
    const handleSelect = jest.fn(); // Объявление мок-функции

    const { getByRole, getByText } = render(
      <Select
        onSelect={handleSelect}
        options={options}
        selectedOption={undefined}
      />
    );

    const selectButton = getByRole('textbox', { name: '' });

    fireEvent.click(selectButton); // Клик по селекту

    fireEvent.keyDown(selectButton, { key: 'ArrowDown' }); // Нажатие клавиши "Вниз"

    expect(getByText('Option 1')).toHaveAttribute('aria-selected', 'true'); // Проверка выбранного значения "Option 1"

    fireEvent.keyDown(selectButton, { key: 'ArrowUp' }); // Нажатие клавиши "Вверх"

    expect(getByText('Option 3')).toHaveAttribute('aria-selected', 'true'); // Проверка выбранного значения "Option 3"
  });
});
