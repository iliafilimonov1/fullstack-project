export interface SelectOption {
  id: string;
  title: string;
}

export interface SelectProps {
  options: SelectOption[];
  onSelect?: (value: SelectOption) => void;
  selectedOption?: SelectOption;
  disabled?: boolean;
  label?: string;
  className?: string;
}
