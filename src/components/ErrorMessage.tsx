import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
    <div className="flex items-center">
      <AlertCircle className="text-red-500 mr-2" size={20} />
      <p className="text-red-700">{message}</p>
    </div>
  </div>
);