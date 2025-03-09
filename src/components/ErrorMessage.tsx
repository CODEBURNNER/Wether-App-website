import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500 bg-opacity-80 text-white p-4 rounded-lg mt-8 flex items-center">
      <AlertCircle className="mr-2" size={24} />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;