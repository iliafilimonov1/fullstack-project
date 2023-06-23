/** Пропсы контейнера */
export interface BoxProps {
  /** Верхняя часть */
  header?: string;
  /** Кнопки хедера */
  headerButtons?: React.ReactNode;
  /** Дочерние компоненты */
  children: React.ReactNode;
  /** Футер */
  footer?: React.ReactNode;
  /** Действия на клик */
  onClick?: ()=> void;
}
