export interface InputProps {
  id?: string;
  label?: string;
  value?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  onClick?: () => void;
  error?: string;
  disabled?: boolean;
  postfix?: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'password';
}
