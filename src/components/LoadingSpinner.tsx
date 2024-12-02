import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="animate-spin text-blue-500" size={32} />
  </div>
);