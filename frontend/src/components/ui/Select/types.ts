export interface SelectOption {
  id: string;
  title: string;
}

export interface SelectProps {
  options: SelectOption[];
  onSelect?: (value: SelectOption) => void;
  selectedOption?: SelectOption;
  defaultValue?: SelectOption | null;
  disabled?: boolean;
  label?: string;
  className?: string;
}
