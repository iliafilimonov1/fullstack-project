export interface ResizeButtonProps {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: ()=>void;
  loading?: boolean;
  disabled?: boolean;
  onFocus?: ()=> void;
}
