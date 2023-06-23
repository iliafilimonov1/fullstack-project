import React from 'react';
import { render, screen } from '@testing-library/react';
import Box from '../components/ui/Containers/Box/Box';

test('calls onClick handler when clicked', () => {
  const onClickMock = jest.fn(); // Создание mock-функции для обработчика

  render(<Box onClick={onClickMock}>Box content</Box>); // Рендер компонента с передачей клика

  const boxElement = screen.getByTestId('box'); // Получение элемента

  boxElement.click();

  expect(onClickMock).toHaveBeenCalledTimes(1); // Была ли вызвана функция один раз
});