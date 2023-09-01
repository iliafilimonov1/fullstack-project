export interface DropdownMenuItemProps {
  text: string;
  icon?: React.ReactNode;
  onItemClick?: (option: string) => void;
}

export interface DropdownMenuProps {
  items: Omit<DropdownMenuItemProps, 'onItemClick'>[];
  onOptionSelect?: (option: string) => void;
}
