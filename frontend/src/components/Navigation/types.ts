/** Элемент навигации */
export type NavItem = {
  label: string;
  link: string;
  subItem?: string[];
  icon?: React.ReactNode;
};
