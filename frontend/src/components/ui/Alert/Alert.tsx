import React from 'react';
import {
  FaInfoCircle, FaCheckCircle, FaExclamationCircle, FaTimesCircle,
} from 'react-icons/fa';

export interface AlertProps {
  /**
   * The variant style of the alert.
   */
  variant?: 'neutral' | 'info' | 'positive' | 'notice' | 'negative';
  /**
   * The content to display within the alert.
   */
  children: React.ReactNode;
}

const variantClasses = {
  neutral: 'bg-gray-100 text-gray-800',
  info: 'bg-blue-100 text-blue-800',
  positive: 'bg-green-100 text-green-800',
  notice: 'bg-yellow-100 text-yellow-800',
  negative: 'bg-red-100 text-red-800',
};

const iconMapping = {
  info: <FaInfoCircle className="w-5 h-5" />,
  positive: <FaCheckCircle className="w-5 h-5" />,
  notice: <FaExclamationCircle className="w-5 h-5" />,
  negative: <FaTimesCircle className="w-5 h-5" />,
};

const Alert:React.FC<AlertProps> = ({ variant = 'neutral', children }) => {
  const selectedIcon = iconMapping[variant as keyof typeof iconMapping];

  return (
    <div
      className={`flex items-center ${variantClasses[variant]} absolute px-3 py-2 rounded-md`}
      role="alert"
    >
      <div className="absolute top-2.5 right-2.5">{selectedIcon}</div>
      <div>{children}</div>
    </div>
  );
};

Alert.displayName = 'Alert';

export default React.memo(Alert);
